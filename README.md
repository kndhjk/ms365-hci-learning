# MS365 & HCI VPC 六天速成学习计划

> 目标：在六天内掌握 MS365 和 HCI VPC 的大体框架，为 Unicorn NZ 实习面试/入职做准备。  
> 每天学习时间：1.5 - 2 小时（可集中也可分散）  
> 学习资源：B站搜索UP主 / Microsoft Learn（免费）

---

## Day 1 · Azure AD（身份与访问管理）

**目标**：理解企业身份管理是什么

### 核心概念（必须掌握）

- **Azure AD / Microsoft Entra ID**：微软的云端身份服务，企业用户用它登录 Office、Teams、Azure 等所有微软服务
- **用户、组、角色**：谁可以访问什么
- **SSO（单点登录）**：一次登录，全公司系统通行
- **MFA（多因素认证）**：手机验证码/APP确认，提升安全性
- **Conditional Access（条件访问）**：基于位置/设备决定谁能登录

### B站学习资源

| UP主 | 内容方向 | 搜索关键词 |
|------|---------|-----------|
| 技术盐究员 | Azure AD 整套系列 | `Azure AD 入门` |
| Leo_StudyIT | 微软认证/Azure 系统课 | `Azure AD 微软 认证` |
| Microsoft Learn（官方） | 免费官方教程+实验 | learn.microsoft.com Azure AD 学习路径 |

### 面试级表达

> "Azure AD 是微软的云身份平台，企业的员工账号、权限、应用授权都在里面管，类似一台中央空调，所有微软服务都从这里获取身份验证。"

### 快速实验（Microsoft Learn 免费）

1. 访问 https://learn.microsoft.com/zh-cn/training/paths/work-identity-virtualizing-user-identities-azure-active-directory/
2. 创建免费 Azure 试用账号（信用卡需要，但实验区免费）
3. 跟着做：创建用户、组、分配置角色

### 自检问题

- [ ] 能用大白话解释 Azure AD 是什么吗？
- [ ] SSO 和 MFA 的区别是什么？
- [ ] Conditional Access 什么时候触发？

---

## Day 2 · Microsoft Teams 管理

**目标**：理解企业协作+语音平台的管理面

### 核心概念（必须掌握）

- **Teams 架构**：Teams = 聊天 + 会议 + 电话 + 应用的集合
- **管理后台**：谁可以创建团队、分配许可证、配置会议策略
- **音频会议（Audio Conferencing）**：微软怎么帮人打电话进来开会（跟Unicorn的Cloud PBX业务强相关）
- **与 Azure AD 的关系**：Teams 账号就是 Azure AD 账号

### B站学习资源

| UP主 | 内容方向 | 搜索关键词 |
|------|---------|-----------|
| 懒猫的IT生活 | MS365/Teams/Exchange系列 | `Teams 企业部署 管理后台` |
| B站极客学院 | Teams 实战课 | `Microsoft 365 Teams 实战` |
| Microsoft Learn（官方） | 免费官方实验 | learn.microsoft.com Teams 管理员学习路径 |

### 面试级表达

> "Teams 不只是聊天工具，它本质上是一个统一通信平台，承载了内部协作和外部电话会议。配置好音频会议策略后，外部人员可以用普通电话拨入开会，这对做Cloud PBX的公司是核心技术点。"

### 自检问题

- [ ] Teams 的许可证有哪几种？
- [ ] 音频会议是给谁用的？
- [ ] 如何在 Teams 管理后台创建一个新团队并限制谁可以创建私人频道？

---

## Day 3 · Intune 设备管理 + 企业移动性

**目标**：理解企业如何安全地管员工手机和电脑

### 核心概念（必须掌握）

- **MDM（移动设备管理）**：公司远程管理员工手机/笔记本（锁死设备、远程擦除）
- **MAM（移动应用管理）**：只管理公司数据，不碰员工个人数据
- **设备注册**：员工手机怎么加入公司管理
- **合规策略**：设备必须满足什么条件才能访问公司数据（密码强度、加密等）

### B站学习资源

| UP主 | 内容方向 | 搜索关键词 |
|------|---------|-----------|
| 戴方城主 | Microsoft 365 管理系列，Intune讲得很透 | `Intune 移动设备管理 MDM` |
| 懒猫的IT生活 | Intune/MDM 实战 | `Microsoft Intune 配置教程` |
| Microsoft Learn（官方） | 免费官方实验 | learn.microsoft.com Intune 学习路径 |

### 面试级表达

> "Intune 是微软的企业移动性管理工具，让IT管理员在员工个人设备上安全地管理公司数据，做到'公司数据进得去、个人数据保得住'，这是企业安全的基本功。"

### 自检问题

- [ ] MDM 和 MAM 的核心区别是什么？
- [ ] 合规策略可以检查设备的哪些方面？
- [ ] 远程擦除和数据选择性擦除有什么区别？

---

## Day 4 · Power Platform 入门 + M365综合串联

**目标**：理解M365的自动化能力，建立全局视图

### 核心概念（必须掌握）

- **Power Automate**：把审批、通知、数据处理自动化（类比：微软的'IFTTT'）
- **Power Apps**：低代码画布应用，非技术人员也能搭简单工具
- **SharePoint Online**：企业文件共享+内容管理平台
- **全局理解**：Azure AD（身份）+ Teams（协作）+ Intune（设备）+ SharePoint（文件）= M365全家桶

### B站学习资源

| UP主 | 内容方向 | 搜索关键词 |
|------|---------|-----------|
| Power Platform 微软技术（官方账号） | Power Automate 入门系列 | `Power Automate 审批流 入门` |
| 阿凯云计算 | SharePoint + Power Apps 实战 | `Power Apps 低代码 开发 SharePoint` |
| B站极客学院 | M365全家桶综合实战 | `Microsoft 365 管理员 实战` |

### 面试级表达

> "M365不只是工具集合，它是一套生态系统，身份、协作、设备管理、文件、自动化全部打通，形成完整的企业数字化工作平台。"

### 自检问题

- [ ] Power Automate 有哪几种触发方式？
- [ ] SharePoint 和 OneDrive 的区别是什么？
- [ ] 能画出 M365 全家桶的组件关系图吗？

---

## Day 5 · 虚拟化基础 + HCI 超融合概念

**目标**：理解HCI是什么，以及它和传统虚拟化的区别

### 核心概念（必须掌握）

- **虚拟化（Virtualization）**：在一台物理服务器上跑多个虚拟机（类比：出租公寓隔间）
- **VMware vSphere / ESXi**：最常见的虚拟化平台，安装在每台物理机上
- **vSAN**：VMware的软件定义存储，把本地磁盘变成共享存储池
- **HCI（超融合基础架构）**：计算、存储、网络融合在一个盒子/集群里，扩展方便，NZ中小企业很常见
- **VM（虚拟机）**：虚拟化出来的'假电脑'

### B站学习资源

| UP主 | 内容方向 | 搜索关键词 |
|------|---------|-----------|
| ScaleFlux中文 | vSphere/vSAN 超融合系列 | `VMware vSphere 虚拟化 入门 vSAN` |
| B站老男孩 | 虚拟化从零到实战 | `ESXi 安装配置 超融合` |
| 技术蛋 | 虚拟化基础讲解 | `虚拟化 入门 原理` |

### 面试级表达

> "HCI 超融合把计算、存储、网络'拧'在一个集群里，扩展节点就像往书架上加格子，不用单独配存储网络，NZ 中小企业 IT 架构里特别常见。"

### 自检问题

- [ ] 虚拟化和 HCI 的核心区别是什么？
- [ ] vSAN 的数据冗余是怎么做的？
- [ ] 什么时候适合用 HCI 而不是传统三层架构？

---

## Day 6 · 合纵连横 + 面试冲刺

**目标**：把六天知识串联起来，准备 Unicorn 面试

### 上午：知识串联

画一张架构图，把六天所学连起来：

```
Azure AD（身份）
    ↓
Teams（通信） + Intune（设备） + SharePoint（文件）
    ↓
Power Automate（自动化）
    ↓
底层：HCI 虚拟化基础设施
```

### 下午：面试场景练习

常见问题：

1. "介绍一下 Azure AD 的 Conditional Access"
2. "如果要给员工手机远程抹除数据，怎么做？"
3. "HCI 和传统架构的区别是什么？什么时候选 HCI？"
4. "M365 全家桶里你用过哪些？介绍一下"
5. "介绍一下 Teams 的音频会议功能"
6. "Power Automate 适合什么场景？举个例子"

### 快速参考资料

- Microsoft Learn 免费学习路径：https://learn.microsoft.com/zh-cn/training/m365/
- MS-102（Microsoft 365 管理员）考试大纲：https://learn.microsoft.com/zh-cn/certifications/exams/ms-102
- VMware HCI 官方文档：https://docs.vmware.com/cn/VMware-vSphere/index.html

---

## 学习路线总结

```
第1-2天 → 身份 + 协作（Azure AD + Teams）
第3天   → 设备管理（Intune）
第4天   → 自动化 + 全局视图（Power Platform + M365全家桶）
第5天   → 底层架构（HCI + 虚拟化）
第6天   → 串联 + 面试冲刺
```

---

*此文档由 AI 学习助手生成 · 为 Unicorn NZ 实习面试准备 · 2026-04-23*
