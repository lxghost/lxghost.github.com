# AI驱动的情报系统
[可视化报告](/static/view/packagist-themes-ios-spyware.html)
## 执行摘要

Socket 发布的研究报告披露了一起针对 **Packagist / Composer 软件供应链**的恶意软件投递活动。

攻击者在多个 PHP Composer 主题包中植入恶意 JavaScript。这些主题主要用于基于 **OphimCMS** 和 **KKPhim** 的电影、漫画流媒体网站。网站管理员安装受污染的主题后，恶意 JavaScript 会被部署到生产网站，并自动提供给访问网站的终端用户。

攻击活动主要包含两条链路：

1. **移动端广告欺诈与赌博跳转**
   - 针对 Android 和 iPhone 等移动设备；
   - 注入广告内容；
   - 将用户重定向至赌博网站；
   - 使用随机子域名、Cookie 和多级跳转进行流量追踪和规避。

2. **针对存在漏洞 iPhone 的 iOS 间谍软件攻击链**
   - 恶意主题加载远程 JavaScript；
   - 根据 iOS 版本选择对应的 WebKit 漏洞利用代码；
   - 获得 Safari/WebContent 进程中的内存操作能力；
   - 通过 IOSurface 等机制继续构建跨进程攻击能力；
   - 最终利用 IOKit 相关接口实现内核级攻击；
   - 部署 iOS 间谍软件；
   - 窃取 Keychain、短信、照片、浏览器数据及加密货币钱包助记词等敏感信息。

从攻击架构来看，这是一次典型的：

```text
恶意 Composer Package
        ↓
网站管理员安装
        ↓
恶意 Theme 部署到生产网站
        ↓
恶意 JavaScript 自动分发
        ↓
网站访问者
        ├── 移动广告 / 赌博欺诈
        │
        └── iPhone
              ↓
          WebKit Exploit
              ↓
         Sandbox / Process Pivot
              ↓
          Kernel Escape
              ↓
          iOS Spyware
              ↓
     数据与钱包助记词窃取
```

这意味着攻击者实施的并非传统意义上的单层软件供应链攻击，而是：

> **攻击 Package → 感染网站 → 利用网站作为终端 Exploit 分发平台。**

对于安全团队而言，最重要的风险在于：恶意 Composer 包的最终受害者不只是开发者或网站管理员，而可能是访问生产网站的大量普通用户。

---

## 已确认恶意 Package

Socket 确认了 13 个恶意 Packagist 主题包，涉及多个 Vendor Namespace。

| Vendor | Package |
|---|---|
| vsmov | theme-dy |
| vsmov | theme-rrdyw |
| vsmov | theme-motchill |
| vsmov | theme-vsmov |
| vsphim | theme-heovl |
| vsphim | theme-thempho |
| haiau009 | kkphim-legend |
| haiau009 | kkphim-motchill |
| chilltvcms | theme-legend |
| ophimcms | theme-dy |
| ophimcms | theme-motchill |
| ophimcms | theme-pcc |
| ophimcms | theme-rrdyw |

对应完整 Package Name：

```text
vsmov/theme-dy
vsmov/theme-rrdyw
vsmov/theme-motchill
vsmov/theme-vsmov

vsphim/theme-heovl
vsphim/theme-thempho

haiau009/kkphim-legend
haiau009/kkphim-motchill

chilltvcms/theme-legend

ophimcms/theme-dy
ophimcms/theme-motchill
ophimcms/theme-pcc
ophimcms/theme-rrdyw
```

建议对以下 Namespace 进行全面供应链审计：

```text
vsmov
vsphim
haiau009
chilltvcms
ophimcms
```

需要注意的是，**当前尚未发现活动 Payload 的其他 Package 也不能自动视为安全**。

如果这些 Package：

- 由相同维护者控制；
- 存在相似代码；
- 共享 JavaScript 注入机制；
- 可以通过 Composer Update 更新；

那么它们依然可能构成 **Sleeper Supply-chain Risk（休眠型供应链风险）**。

---

## 攻击背景

OphimCMS 和 KKPhim 是用于搭建电影、电视剧和漫画流媒体网站的 PHP/Laravel 项目。

其部署模型通常为：

```text
Laravel CMS Core
      +
Composer Theme Package
      ↓
Streaming Website
```

Theme Package 除了提供页面模板外，通常还包含：

- JavaScript；
- jQuery；
- 视频播放器；
- Banner；
- Slider；
- 页面交互逻辑；
- 第三方前端组件。

攻击者利用这一特点，在正常 Theme 的前端 JavaScript 中植入恶意 Loader。

管理员执行类似操作：

```bash
composer require vendor/theme
```

随后：

```text
Composer 安装恶意 Theme
        ↓
Theme 部署到生产服务器
        ↓
恶意 JavaScript 进入网站静态资源
        ↓
用户访问网页
        ↓
浏览器自动执行恶意 JavaScript
```

因此，攻击链实现了从：

```text
Developer / Website Operator
```

向：

```text
Website Visitors
```

的攻击扩散。

这是本次事件最值得关注的供应链特征。

---

## 完整攻击链

整体攻击链可以概括为：

```text
Packagist
    ↓
Trojanized Composer Theme
    ↓
Production Streaming Website
    ↓
Malicious JavaScript Loader
    ↓
Traffic Filtering
    │
    ├── Mobile Advertising / Gambling
    │
    └── iOS Exploit Chain
            ↓
        iOS Version Detection
            ↓
        WebKit Exploit
            ↓
        Memory Primitive
            ↓
        IOSurface / Process Pivot
            ↓
        IOKit Kernel Escape
            ↓
        Spyware Payload
            ↓
        Sensitive Data Collection
            ↓
        Crypto Wallet Seed Theft
            ↓
        Encrypted C2 Exfiltration
```

攻击者首先利用 JavaScript 对目标进行筛选，包括：

- 操作系统；
- 浏览器；
- User-Agent；
- iOS Version；
- Referrer；
- 是否为移动设备。

这种筛选机制可以降低 Payload 被：

- 自动扫描器；
- Desktop Sandbox；
- 普通爬虫；
- 安全研究人员；

发现的概率。

---

## 移动广告与赌博跳转

攻击链的一部分并不针对 iOS Exploit，而是用于移动流量变现。

恶意 JavaScript 会检测以下平台：

```text
iPhone
iPod
Android
iOS
```

匹配成功后可能执行：

```text
Mobile Visitor
      ↓
Malicious Banner
      ↓
Traffic Redirector
      ↓
Session Cookie
      ↓
Randomized Subdomain
      ↓
Gambling Landing Page
```

Socket 观察到攻击者使用：

- Campaign ID；
- Cookie；
- 多级 HTTP Redirect；
- 随机化 `.vip` 子域名；
- 非标准端口；

实现流量分发和用户追踪。

这部分活动更接近：

```text
Malvertising
+
Traffic Hijacking
+
Gambling Affiliate Fraud
```

因此，同一个供应链可能同时服务于低成本、大规模的流量变现活动。

---

## iOS Exploit Chain

更严重的攻击链针对未安装相关安全更新的 iPhone。

恶意 JavaScript 在识别到符合条件的 iOS 设备后，会加载对应版本的 Exploit。

攻击流程为：

```text
Malicious Website
        ↓
Second-stage JavaScript
        ↓
Hidden iframe
        ↓
iOS Version Detection
        ↓
Select Exploit
        ↓
WebKit / JavaScriptCore Exploit
        ↓
Arbitrary Read / Write
        ↓
Further Privilege Escalation
        ↓
Kernel-level Access
        ↓
Spyware
```

Socket 识别到攻击链使用了针对不同 iOS 版本的漏洞，包括：

| CVE | 相关攻击目标 |
|---|---|
| CVE-2025-31277 | iOS 18.4 - 18.5 |
| CVE-2025-43529 | iOS 18.6 及相关版本 |

攻击代码会根据目标系统版本选择不同 Exploit Worker。

这意味着攻击者并非简单嵌入一个公开 PoC，而是具备一定的：

```text
Exploit Version Selection
+
Device Compatibility Management
+
Offset Management
```

能力。

---

## WebKit 利用机制

Socket 对公开攻击代码的分析显示，攻击链通过 WebKit / JavaScriptCore 内存破坏漏洞建立进一步攻击能力。

技术过程可以抽象为：

```text
Memory Corruption
      ↓
Object Address Disclosure
      ↓
Fake Object Construction
      ↓
Corrupted Typed Array
      ↓
Arbitrary Memory Read
      ↓
Arbitrary Memory Write
```

攻击代码同时包含针对不同：

- iOS Build；
- Device Model；
- SoC / Chipset；

的适配信息。

这表明攻击者维护的是一个具有工程化特征的：

> **Browser Exploit Delivery Framework**

而不是一次性漏洞利用代码。

---

## IOSurface 与跨进程攻击

获得 WebContent 进程中的能力后，攻击链继续尝试扩大权限范围。

Socket 描述攻击代码涉及：

```text
IOSurface
mach Messaging
Pointer Authentication
```

攻击路径可以抽象为：

```text
Safari / WebContent
        ↓
WebKit Exploit
        ↓
Renderer Memory Primitive
        ↓
IOSurface Abuse
        ↓
Cross-process Primitive
        ↓
GPU-related Process
```

这一阶段的目标是突破单一浏览器渲染进程的安全边界。

从攻击模型来看：

```text
Browser Exploitation
```

只是 Initial Foothold。

真正的攻击目标是继续构建：

```text
Sandbox Escape
+
Privilege Escalation
```

能力。

---

## IOKit Kernel Escape

攻击链最终涉及 Apple IOKit 相关接口。

Socket 的分析指出，恶意代码与以下组件存在关联：

```text
AppleM2ScalerCSCDriver
```

攻击流程涉及：

```text
mediaplaybackd XPC
        ↓
IOServiceOpen
        ↓
External Method
        ↓
IOSurface Interaction
        ↓
Kernel Memory Primitive
```

攻击代码公开特征包括：

```text
IOServiceOpen Type: 0
Selector: 1
Input Struct: 432 bytes
IOSurface IDs: 2
```

Socket 指出，这一攻击表面与后来公开的：

```text
CVE-2026-43655
```

存在关联，但实际攻击链与公开 PoC 并不完全相同。

公开信息显示，攻击者使用的 Kernel Escape 针对已经修复的漏洞状态，而不是直接针对当时最新系统的未知漏洞。

因此，这条攻击链更符合：

> **Operationalized N-day Exploitation**

即攻击者快速将已经存在或已经修复前后的漏洞能力工程化，并持续用于真实攻击活动。

---

## iOS 间谍软件能力

成功获得更高权限后，最终 Payload 可以访问和窃取大量设备敏感信息。

目标包括：

```text
Keychain
Wi-Fi Passwords
SMS Database
Contacts
Photos
Browser Cookies
Browsing History
Call History
Location History
Account Databases
Notes
Calendar
```

攻击流程：

```text
Sensitive iOS Data
        ↓
Data Collection
        ↓
Local Processing
        ↓
AES Encryption
        ↓
HTTPS POST
        ↓
C2 Server
```

攻击者同时通过远程基础设施跟踪：

```text
Exploit Status
Payload Execution
```

因此，该 Payload 不只是简单的信息窃取脚本，而具有完整的：

```text
Collection
+
Encryption
+
Command and Control
+
Exfiltration
```

能力。

---

## 加密货币钱包助记词窃取

2026 年 8 月，攻击者重新部署攻击基础设施，并扩展了 Spyware 的数据窃取能力。

新版本增加了针对加密货币钱包数据的 Keychain 查询。

报告中涉及的钱包包括：

```text
Bitget
BitKeep
Bitpie
Phantom
Tonkeeper
Trust Wallet
OKX
```

相关代码命名包括：

```text
keychain_query_bitget
keychain_query_bitpie
keychain_query_phantom
keychain_query_tonkeeper
keychain_query_trust
mnemonics_vault_
```

这代表攻击目标从传统的：

```text
Surveillance
```

进一步升级为：

```text
Surveillance
      +
Credential Theft
      +
Crypto Wallet Seed Theft
      ↓
Potential Direct Financial Theft
```

助记词或 Seed Phrase 一旦泄露，攻击者理论上可以绕过传统登录保护，直接恢复对应钱包。

因此，这是本次事件中最直接的金融风险。

---

## 基础设施

Socket 将多个阶段与 FUNNULL 基础设施关联。

观察到的关键基础设施包括：

```text
union[.]macoms[.]la
cdn[.]data-2920[.]com
www[.]cloudfareintcdn[.]com
cloudfareintcdn[.]com
```

其中：

```text
cloudfareintcdn[.]com
```

采用了明显类似 Cloudflare 的仿冒式命名。

整体基础设施关系可以理解为：

```text
Theme Operators
      │
      ├── Malicious Composer Packages
      │
      └── Compromised / Weaponized Websites
                    ↓
            Shared Delivery Infrastructure
                    ↓
                  FUNNULL
                    ↓
       Exploit / C2 / Payload Delivery
```

需要注意的是：

> 共享基础设施不等于所有活动均由同一个攻击者直接执行。

更合理的 CTI 判断是：

```text
Multiple Operators
        +
Shared Infrastructure
        +
Shared Service Provider / Ecosystem
```

而不是简单归因为单一 APT。

---

## IOC

建议结合以下 IOC 进行威胁狩猎。

高风险 Package：

```text
vsmov/theme-dy
vsmov/theme-rrdyw
vsmov/theme-motchill
vsmov/theme-vsmov

vsphim/theme-heovl
vsphim/theme-thempho

haiau009/kkphim-legend
haiau009/kkphim-motchill

chilltvcms/theme-legend

ophimcms/theme-dy
ophimcms/theme-motchill
ophimcms/theme-pcc
ophimcms/theme-rrdyw
```

高风险 Namespace：

```text
vsmov
vsphim
haiau009
chilltvcms
ophimcms
```

恶意或可疑域名：

```text
union[.]macoms[.]la
cdn[.]data-2920[.]com
www[.]cloudfareintcdn[.]com
cloudfareintcdn[.]com
```

广告与流量跳转基础设施：

```text
23[.]225[.]52[.]67:4466
23[.]225[.]48[.]20:4466

im[.]ue8im[.]com
xl0ph4qz[.]vip:7740
cre-ads[.]com
```

部分公开文件 Hash：

```text
start-view.html

SHA256:
60b6771958cb7e553994ba6752f108575ba70e02d24affb51d8936a17eb0bf5e
```

```text
a4tt4g37f36gdd7q7kdc.js

SHA256:
d9530e8cd79ac7b3d02b04e05426653afca7075fcf7424eec4d59c6e95745933
```

```text
a84snnb6pknt3aflt01r.js

SHA256:
92c7d246d2c163c076f783dcc19f87f5b9b9ac301b106b87a7aaea9346ce0052
```

```text
921w48jmeqvt3ygn0wwx.js

SHA256:
f2fdfddbc436acc24a654092f5205b2c5bd3208b126b2c2754ac63e7aea22298
```

```text
4ap5xpu18z70wwslqybu.js

SHA256:
9d6b58886189c0e23f706c32d3d8dda97b0b6d927ece6de07270813f070295b5
```

```text
qljbd9a1h4a83gw8lxcj.js

SHA256:
de539a63cbe27bbd4a7db30fc796cd6dc5309c02ef5e60a3c5cf0835e5601283
```

攻击者重新部署后还观察到新的阶段文件名：

```text
98jgbibyeep2qfkvcq.html
pf2zdl2b4i4cxggjg9s7.js
sejpbqlu090u7lz0z6ax.js
```

IOC 应被视为时间敏感指标。攻击者已经表现出基础设施和 Payload 文件名轮换能力，因此不能仅依赖静态 Domain Blocklist。

---

## 检测建议

对于使用 Composer 的服务器，可以首先检查：

```bash
grep -RniE "vsmov|vsphim|haiau009|chilltvcms|ophimcms" \
composer.json composer.lock vendor/ 2>/dev/null
```

重点检查：

```text
composer.json
composer.lock
vendor/
CI/CD Dependency Cache
Deployment Artifact
```

同时检查 Theme JavaScript 是否存在：

```text
Base64 Encoded URLs
Custom Decoder
eval(
document.createElement('script')
Hidden iframe
navigator.userAgent
document.referrer
IOSurface
```

特别关注以下模式：

```text
正常 JavaScript Library
        +
文件末尾追加未知 Loader
```

例如：

```text
正常 jQuery
      ↓
Unexpected Appended JavaScript
      ↓
Remote Script Loader
```

这是本次攻击中非常重要的文件完整性检测思路。

---

## 网络检测建议

建议在：

```text
DNS
Proxy
NDR
SIEM
CDN Logs
Web Server Logs
```

中进行关联检测。

基础规则：

```text
Client Platform = iOS
      AND
访问流媒体网站
      AND
随后访问未知随机命名 JavaScript
      AND
连接已知恶意基础设施
```

高风险关联：

```text
iOS Device
      ↓
Affected Website
      ↓
union.macoms.la
      ↓
data-2920.com
      ↓
cloudfareintcdn.com
      ↓
Large / Unusual POST Exfiltration
```

对于网站运营者，应特别统计：

```text
恶意 Theme 存在期间
        ↓
Unique Visitors
        ↓
iPhone / iPad Visitors
        ↓
对应访问时间
```

这是确定潜在受害范围的重要依据。

---

## MITRE ATT&CK 映射

| 战术 | 技术 | 本事件表现 |
|---|---|---|
| Initial Access | Drive-by Compromise | 用户访问被感染网站 |
| Execution | JavaScript Execution | 恶意 Theme 注入 JavaScript |
| Defense Evasion | Obfuscated Files or Information | Base64、编码和自定义 Decoder |
| Discovery | System Information Discovery | 检测 iOS Version、User-Agent、Platform |
| Exploitation | Exploitation for Client Execution | WebKit 漏洞利用 |
| Privilege Escalation | Exploitation for Privilege Escalation | Kernel Escape |
| Credential Access | Credentials from Password Stores | Keychain 与钱包数据 |
| Collection | Data from Local System | SMS、照片、Cookie、联系人 |
| Command and Control | Application Layer Protocol | HTTPS 通信 |
| Exfiltration | Exfiltration Over Web Service | HTTPS POST 数据上传 |
| Impact | Financial Theft | Crypto Wallet Seed / Mnemonic Theft |

---

## 处置建议

如果发现服务器安装了相关 Package，应立即执行以下操作。

**第一步：隔离和确认**

```text
确认 Package Name
        ↓
确认安装时间
        ↓
确认首次部署时间
        ↓
确认恶意 JavaScript 是否进入生产环境
        ↓
确认访问日志保存范围
```

**第二步：移除恶意依赖**

不要仅删除单个 JavaScript 文件。

应完整检查：

```text
composer.json
composer.lock
vendor/
Theme Assets
Deployment Artifact
CDN Cache
CI/CD Cache
Backup
```

然后从可信来源重新构建部署环境。

**第三步：凭据轮换**

建议轮换：

```text
SSH Credentials
CMS Administrator Passwords
Database Passwords
API Keys
OAuth Secrets
Cloud Credentials
CI/CD Tokens
```

**第四步：用户影响调查**

建立时间线：

```text
Malicious Package Introduced
        ↓
Production Deployment
        ↓
Malicious JS Active
        ↓
Malicious Domain Connection
        ↓
iOS Visitors
        ↓
Potential Exploitation Window
```

核心调查问题是：

> 在恶意 JavaScript 活跃期间，有多少 iOS 用户访问过受影响网站？

---

## 核心威胁判断

### 供应链攻击正在成为终端攻击分发渠道

传统供应链攻击通常被理解为：

```text
Malicious Package
      ↓
Developer
      ↓
Developer Workstation
```

本次事件展示了新的传播模型：

```text
Malicious Package
      ↓
Website Operator
      ↓
Production Website
      ↓
Large Number of Visitors
      ↓
Browser Exploitation
      ↓
Endpoint Compromise
```

攻击面已经扩展为：

```text
Package
   ↓
Service Provider
   ↓
Customer
   ↓
Endpoint
```

因此，Package 风险评估不能只考虑：

> “该依赖是否会影响开发者主机？”

还必须考虑：

> “该依赖是否能够向生产用户分发主动攻击代码？”

---

### 恶意 JavaScript 是高价值 Exploit Delivery Layer

一旦攻击者控制网站 JavaScript：

```text
No Malicious App Installation
No APK
No Traditional File Download
No Explicit Permission Prompt
```

用户只需要访问网站，就可能进入漏洞利用流程。

因此，受污染的 Web Asset 实际上可以成为：

```text
Exploit Delivery Infrastructure
```

这也是为什么：

```text
Third-party JavaScript
Theme
Analytics Script
Ad Script
CDN Asset
```

需要被视为软件供应链的一部分。

---

### 广告欺诈与高价值攻击可以使用同一基础设施

攻击者可以同时采用两种收益模型：

```text
Mass-scale Monetization
    ├── Ad Fraud
    └── Gambling Redirect
```

以及：

```text
High-value Targeting
    ├── Spyware
    ├── Credential Theft
    └── Crypto Asset Theft
```

因此，同一个恶意 Package 并不一定只有一个 Payload 目的。

攻击者可能根据：

```text
Device
OS Version
User Value
Traffic Source
```

动态选择攻击方式。

---

### 需要关注休眠型恶意 Package

本次事件再次说明：

> 当前没有发现恶意 Payload，不代表 Package 是可信的。

如果攻击者仍然拥有：

```text
Package Ownership
+
Update Permission
+
Code Injection Capability
```

那么 Package 本身就可能成为未来攻击的预置入口。

因此，SCA 和 SBOM 不应只依赖：

```text
Known Malicious Hash
```

更应该建立：

```text
Package Provenance
+
Publisher Reputation
+
Maintainer Relationship
+
Namespace Analysis
+
Code Provenance
+
Update Behavior
+
Runtime Network Behavior
```

的综合供应链风险模型。

---

## 最终结论

这起事件展示了一种非常值得关注的现代攻击模式：

```text
Software Supply Chain Compromise
        ↓
Production Website Compromise
        ↓
Browser-based Payload Delivery
        ↓
Traffic Filtering
        ↓
N-day Exploitation
        ↓
Privilege Escalation
        ↓
Mobile Spyware
        ↓
Financial Data Theft
```

攻击者首先利用 Packagist 和 Composer Theme 作为供应链入口，再利用合法网站的用户访问流量作为恶意 Payload 的分发渠道。

从 CTI 视角，本事件反映出三个重要趋势：

1. **软件供应链正在成为浏览器和终端漏洞利用的规模化分发渠道；**
2. **恶意 Web JavaScript、广告欺诈和高端 Exploit Infrastructure 正在融合；**
3. **传统 Spyware 正逐渐加入加密钱包和数字资产窃取能力。**

建议企业建立跨层防御体系：

```text
Package Security
        +
SBOM / Dependency Inventory
        +
Publisher Reputation
        +
JavaScript Integrity Monitoring
        +
CDN / Web Asset Monitoring
        +
Network Detection
        +
Threat Intelligence
        +
Mobile Incident Response
```

对于使用 PHP、Laravel、Composer 和第三方 Theme 的组织，尤其应将：

```text
第三方 Theme
=
Production Supply Chain Component
```

纳入正式的供应链安全管理范围。

---

## 参考来源

**Socket Threat Research**

《13 Malicious Packagist Themes Deliver iOS Spyware That Steals Crypto Wallet Seeds》

发布日期：2026-08-31

原文：

https://socket.dev/blog/packagist-themes-ios-spyware