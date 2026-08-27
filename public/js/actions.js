/** Shared Clipboard API with a local legacy fallback. */
(function (global) {
  'use strict';

  function fallbackCopy(text, doc) {
    var textarea = doc.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.inset = '-9999px auto auto -9999px';
    doc.body.appendChild(textarea);
    textarea.select();
    if (textarea.setSelectionRange) textarea.setSelectionRange(0, text.length);
    var copied = false;
    try {
      copied = doc.execCommand('copy');
    } finally {
      textarea.remove();
    }
    if (!copied) throw new Error('clipboard fallback was rejected');
  }

  function writeText(text, doc, nav) {
    doc = doc || global.document;
    nav = nav || global.navigator;
    var clipboard = nav && nav.clipboard;
    if (clipboard && typeof clipboard.writeText === 'function') {
      return Promise.resolve()
        .then(function () { return clipboard.writeText(text); })
        .catch(function () {
          fallbackCopy(text, doc);
        });
    }
    return Promise.resolve().then(function () {
        fallbackCopy(text, doc);
    });
  }

  var api = { writeText: writeText };
  global.OinkClipboard = api;
  if (typeof module === 'object' && module.exports) module.exports = api;
})(typeof window === 'object' ? window : globalThis);

;
/**
 * surface-coordinator.js — coordinate mutually exclusive transient UI.
 *
 * A surface registers a close callback and may request that the coordinator
 * close every other registered surface before it opens. The callbacks own
 * their own focus-restoration policy; coordinated closes deliberately do not
 * steal focus from the surface being opened.
 */
(function () {
  'use strict';

  var surfaces = new Map();

  function register(name, close) {
    if (!name || typeof close !== 'function') return function () {};
    var callbacks = surfaces.get(name) || [];
    callbacks.push(close);
    surfaces.set(name, callbacks);
    return function () {
      var current = surfaces.get(name) || [];
      current = current.filter(function (callback) {
        return callback !== close;
      });
      if (current.length) {
        surfaces.set(name, current);
      } else {
        surfaces.delete(name);
      }
    };
  }

  function closeOthers(activeName, keepNames) {
    var keep = new Set(keepNames || []);
    surfaces.forEach(function (callbacks, name) {
      if (name !== activeName && !keep.has(name))
        callbacks.slice().forEach(function (close) {
          close(false);
        });
    });
  }

  function closeAll(restoreFocus) {
    surfaces.forEach(function (callbacks) {
      callbacks.slice().forEach(function (close) {
        close(restoreFocus === true);
      });
    });
  }

  window.OinkSurfaceCoordinator = {
    register: register,
    closeOthers: closeOthers,
    closeAll: closeAll,
  };
})();

;
/**
 * action-registry.js — shared execution for page actions and the Palette.
 *
 * Page-specific URLs and localized labels arrive as inert JSON. The only
 * executable operations are the built-ins in this file or explicitly
 * registered theme executors; site configuration can never add callbacks.
 */
(function (global) {
  'use strict';

  var BUILTINS = new Set([
    'copy_markdown',
    'copy_link',
    'open_chatgpt',
    'open_claude',
    'view_markdown',
    'view_history',
    'edit_page',
    'create_child_page',
    'create_issue',
    'create_project_issue',
    'print_section',
    'print',
    'switch_theme',
    'switch_language',
    'switch_version',
    'open_github',
  ]);
  var SAFE_SCHEMES = new Set(['http:', 'https:']);

  function readManifest(documentObject) {
    var node = documentObject.getElementById('td-action-manifest');
    if (!node) return { version: 1, actions: [], commands: [] };
    try {
      var parsed = JSON.parse(node.textContent || '{}');
      return parsed && parsed.version === 1
        ? parsed
        : { version: 1, actions: [], commands: [] };
    } catch (_) {
      return { version: 1, actions: [], commands: [] };
    }
  }

  function safeUrl(value, base) {
    if (!value || /^\s|\s$/.test(value) || /^[/\\]{2}/.test(value) || /\\/.test(value))
      return null;
    try {
      var parsed = new URL(value, base);
      if (!SAFE_SCHEMES.has(parsed.protocol)) return null;
      return parsed.href;
    } catch (_) {
      return null;
    }
  }

  function create(options) {
    options = options || {};
    var windowObject = options.window || global;
    var documentObject = options.document || windowObject.document;
    var manifest = options.manifest || readManifest(documentObject);
    var clipboard = options.clipboard || windowObject.OinkClipboard || global.OinkClipboard;
    var fetchApi =
      options.fetch ||
      (windowObject.fetch
        ? windowObject.fetch.bind(windowObject)
        : function () {
            return Promise.reject(new Error('Fetch unavailable'));
          });
    var actions = new Map();
    var commands = [];
    var executors = new Map();
    var markdown = new Map();

    (manifest.actions || []).forEach(function (action) {
      if (BUILTINS.has(action.id) && !actions.has(action.id))
        actions.set(action.id, Object.freeze(action));
    });
    (manifest.commands || []).forEach(function (command) {
      if (!command || !command.id) return;
      if (command.kind === 'builtin') {
        if (!BUILTINS.has(command.action)) return;
      } else if (command.kind === 'url') {
        if (!safeUrl(command.url, windowObject.location.href)) return;
      } else {
        return;
      }
      commands.push(Object.freeze(command));
    });

    function failure(code, action, message) {
      var error = new Error(message || code);
      error.code = code;
      error.action = action || null;
      return error;
    }

    function get(id) {
      return actions.get(id) || null;
    }

    function list(query) {
      query = query || {};
      var placement = query.placement;
      return Array.from(actions.values()).filter(function (action) {
        return !placement || (action.placements && action.placements[placement]);
      });
    }

    function getCommands() {
      return commands.slice();
    }

    function getQuickLinks() {
      return (manifest.quickLinks || []).filter(function (link) {
        return link && link.kind === 'url' && safeUrl(link.url, windowObject.location.href);
      }).slice();
    }

    function getRootOrder() {
      return (manifest.rootOrder || []).map(function (key) {
        return String(key).trim().toLowerCase();
      }).filter(Boolean);
    }

    function fetchMarkdown(url) {
      if (markdown.has(url)) return markdown.get(url);
      var pending = fetchApi(url)
        .then(function (response) {
          if (!response.ok) throw failure('markdown_fetch_failed', null);
          return response.text();
        })
        .catch(function (error) {
          markdown.delete(url);
          throw error;
        });
      markdown.set(url, pending);
      return pending;
    }

    function writeClipboard(text) {
      return clipboard.writeText(text, documentObject, windowObject.navigator);
    }

    function resolveUrl(actionOrId, value) {
      var action = typeof actionOrId === 'string' ? get(actionOrId) : actionOrId;
      if (!action || action.available === false) return null;
      if (action.id === 'open_chatgpt' || action.id === 'open_claude') {
        if (
          typeof action.promptTemplate !== 'string' ||
          action.promptTemplate.indexOf('%s') < 0
        ) return null;
        var prompt = action.promptTemplate.replace('%s', function () {
          return windowObject.location.href;
        });
        var assistantUrl = action.id === 'open_chatgpt'
          ? 'https://chatgpt.com/?hints=search&prompt=' + encodeURIComponent(prompt)
          : 'https://claude.ai/new?q=' + encodeURIComponent(prompt);
        return safeUrl(assistantUrl, windowObject.location.href);
      }
      var target = value && value.url ? value.url : action.url;
      return safeUrl(target, windowObject.location.href);
    }

    function openUrl(action, value) {
      var url = resolveUrl(action, value);
      if (!url) return Promise.reject(failure('unsafe_url', action));
      if (action.target === 'blank' || (value && value.target === 'blank')) {
        windowObject.open(url, '_blank', 'noopener,noreferrer');
      } else {
        windowObject.location.assign(url);
      }
      return Promise.resolve({ action: action, url: url });
    }

    function run(id, context) {
      var action = get(id);
      context = context || {};
      if (!action) return Promise.reject(failure('unsupported_action', null, id));
      if (!action.available)
        return Promise.reject(
          failure('unavailable', action, action.disabledReason || 'Unavailable'),
        );
      var custom = executors.get(id);
      if (custom) return Promise.resolve().then(function () { return custom(context, action); });
      if (id === 'copy_markdown') {
        if (!action.url) return Promise.reject(failure('unavailable', action));
        return fetchMarkdown(action.url)
          .then(writeClipboard)
          .then(function () { return { action: action }; });
      }
      if (id === 'copy_link') {
        // The descriptor carries the page's canonical URL; a control may name
        // its own instead. Either way it goes through the same scheme check as
        // a navigation, so nothing but an http(s) URL reaches the clipboard.
        var link = safeUrl(
          (context.value && context.value.url) || action.url,
          windowObject.location.href,
        );
        if (!link) return Promise.reject(failure('unsafe_url', action));
        return writeClipboard(link).then(function () { return { action: action }; });
      }
      if (id === 'print') {
        windowObject.print();
        return Promise.resolve({ action: action });
      }
      if (action.kind === 'url') return openUrl(action, context.value);
      if (action.kind === 'choice' && context.value && context.value.url)
        return openUrl(action, context.value);
      return Promise.reject(failure('missing_executor', action));
    }

    function runCommand(id, context) {
      var command = commands.find(function (candidate) { return candidate.id === id; });
      if (!command) return Promise.reject(failure('unsupported_command', null, id));
      if (command.kind === 'builtin') {
        var action = get(command.action);
        if (
          action &&
          action.kind === 'choice' &&
          !(context && context.value)
        ) {
          if (!action.available)
            return Promise.reject(
              failure('unavailable', action, action.disabledReason || 'Unavailable'),
            );
          return Promise.resolve({
            action: action,
            command: command,
            options: (action.options || []).slice(),
            requiresChoice: true,
          });
        }
        return run(command.action, context);
      }
      return openUrl(command, context && context.value);
    }

    function registerExecutor(id, executor) {
      if (!BUILTINS.has(id) || typeof executor !== 'function')
        throw failure('unsupported_executor', get(id), id);
      if (executors.has(id)) throw failure('duplicate_executor', get(id), id);
      executors.set(id, executor);
    }

    function invalidateMarkdown(url) {
      if (url) markdown.delete(url);
      else markdown.clear();
    }

    return Object.freeze({
      get: get,
      list: list,
      commands: getCommands,
      quickLinks: getQuickLinks,
      rootOrder: getRootOrder,
      run: run,
      runCommand: runCommand,
      registerExecutor: registerExecutor,
      preloadMarkdown: fetchMarkdown,
      invalidateMarkdown: invalidateMarkdown,
      resolveUrl: function (id, value) { return resolveUrl(id, value); },
      safeUrl: function (value) { return safeUrl(value, windowObject.location.href); },
    });
  }

  var api = { BUILTINS: BUILTINS, create: create, safeUrl: safeUrl };
  global.OinkActionRegistry = api;
  if (global.document) global.OinkActions = create();
  if (typeof module === 'object' && module.exports) module.exports = api;
})(typeof window === 'object' ? window : globalThis);

;
/** Bind every rendered `data-td-action` control -- the title split button and
 *  its menu, the share bar's copy control -- to the shared action registry. */
(function () {
  'use strict';
  if (!window.OinkActions) return;

  function announce(root, text) {
    var status = root && root.querySelector('[data-td-page-context-status]');
    if (!status) return;
    status.textContent = '';
    window.requestAnimationFrame(function () { status.textContent = text; });
  }

  function showCopied(button, root) {
    // Every copy control sits inside a context root that carries the confirmed
    // wording, but the flip must survive a control that does not.
    var copied = (root && root.dataset.tdTCopied) || '';
    var label = button.querySelector('[data-td-page-copy-label]');
    button.classList.add('td-is-copied');
    if (label && !label.dataset.original) label.dataset.original = label.textContent;
    if (label && copied) label.textContent = copied;
    announce(root, copied || 'Copied');
    window.setTimeout(function () {
      button.classList.remove('td-is-copied');
      if (label && label.dataset.original) label.textContent = label.dataset.original;
    }, 1400);
  }

  function syncUrl(control, id) {
    var url = window.OinkActions.resolveUrl(id);
    if (url) control.setAttribute('href', url);
  }

  document.querySelectorAll('[data-td-action]').forEach(function (control) {
    var id = control.dataset.tdAction;
    var action = window.OinkActions.get(id);
    if (!action || !action.available) return;
    var root = control.closest('[data-td-page-context]');

    if (id === 'copy_markdown') {
      // Feedback always lands on the visible primary half, so a copy from a
      // menu row flashes the same confirmation.
      // Only a copy primary may carry the flash — on feed pages the primary
      // is the RSS link and must keep its icon.
      var feedback =
        (root &&
          root.querySelector('.td-page-actions__primary[data-td-action="copy_markdown"]')) ||
        control;
      ['pointerenter', 'focus'].forEach(function (eventName) {
        control.addEventListener(eventName, function () {
          window.OinkActions.preloadMarkdown(action.url).catch(function () {});
        }, { once: true });
      });
      control.addEventListener('click', function () {
        window.OinkActions.run(id, { source: 'page' })
          .then(function () { showCopied(feedback, root); })
          .catch(function () {
            announce(root, (root && root.dataset.tdTCopyError) || 'Copy failed');
          });
      });
    } else if (id === 'copy_link') {
      // The share bar's own control. `data-td-url` names the link explicitly;
      // without it the registry falls back to the page's canonical URL, so a
      // control that omits the attribute still copies rather than throwing.
      control.addEventListener('click', function () {
        var url = control.dataset.tdUrl || '';
        window.OinkActions.run(id, {
          source: 'page',
          value: url ? { url: url } : null,
        })
          .then(function () { showCopied(control, root); })
          .catch(function () {
            announce(root, (root && root.dataset.tdTCopyError) || 'Copy failed');
          });
      });
    } else if (id === 'print') {
      control.addEventListener('click', function () {
        window.OinkActions.run(id, { source: 'page' });
      });
    } else if (
      (id === 'open_chatgpt' || id === 'open_claude') &&
      action.kind === 'url' &&
      control.tagName === 'A'
    ) {
      syncUrl(control, id);
      control.addEventListener('click', function () { syncUrl(control, id); });
    }
  });

  /* The caret disclosure beside the title. */
  function initTitleMenu() {
    var root = document.querySelector('[data-td-page-actions]');
    if (!root) return;
    var toggle = root.querySelector('[data-td-page-actions-toggle]');
    var menu = root.querySelector('[data-td-page-actions-menu]');
    if (!toggle || !menu) return;

    function isOpen() {
      return root.classList.contains('td-is-open');
    }

    function open() {
      if (window.OinkSurfaceCoordinator) {
        window.OinkSurfaceCoordinator.closeOthers('page-actions');
      }
      root.classList.add('td-is-open');
      toggle.setAttribute('aria-expanded', 'true');
    }

    function close(restoreFocus) {
      root.classList.remove('td-is-open');
      toggle.setAttribute('aria-expanded', 'false');
      if (restoreFocus) toggle.focus();
    }

    if (window.OinkSurfaceCoordinator) {
      window.OinkSurfaceCoordinator.register('page-actions', function () {
        close(false);
      });
    }

    toggle.addEventListener('click', function () {
      if (isOpen()) close(false); else open();
    });

    // Rows act on activation; links open a new tab, copy and print run their
    // own handlers first in bubble order. Either way the menu closes.
    menu.addEventListener('click', function (event) {
      if (event.target.closest('a, button')) close(false);
    });

    document.addEventListener('pointerdown', function (event) {
      if (isOpen() && !root.contains(event.target)) close(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen()) {
        event.preventDefault();
        close(true);
        return;
      }
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp' &&
          event.key !== 'Home' && event.key !== 'End') return;
      if (!root.contains(document.activeElement)) return;
      var items = Array.prototype.slice.call(menu.querySelectorAll('a, button'));
      if (!items.length) return;
      if (!isOpen()) {
        if (event.key === 'ArrowDown' && document.activeElement === toggle) {
          event.preventDefault();
          open();
          items[0].focus();
        }
        return;
      }
      event.preventDefault();
      var index = items.indexOf(document.activeElement);
      if (event.key === 'Home' || (event.key === 'ArrowDown' && index === -1)) {
        items[0].focus();
      } else if (event.key === 'End') {
        items[items.length - 1].focus();
      } else if (event.key === 'ArrowDown') {
        items[Math.min(index + 1, items.length - 1)].focus();
      } else if (event.key === 'ArrowUp') {
        items[Math.max(index - 1, 0)].focus();
      }
    });
  }

  initTitleMenu();
})();
