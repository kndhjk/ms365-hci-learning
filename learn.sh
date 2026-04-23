#!/bin/bash
#===============================================
# MS365 & HCI VPC 六天速成学习脚本
# 用法: bash learn.sh [day|status|reset|help]
#===============================================

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
PROGRESS_FILE="$REPO_DIR/.progress"
LOG_FILE="$REPO_DIR/learning.log"

# 颜色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 表情
DONE='✅'
TODO='⬜'
RUN='🔄'

#----------------------------------------------
# 初始化进度文件
#----------------------------------------------
init_progress() {
    if [[ ! -f "$PROGRESS_FILE" ]]; then
        cat > "$PROGRESS_FILE" << 'EOF'
DAY1_AZUREAD=0
DAY1_TEAMS=0
DAY1_INTUNE=0
DAY1_POWERPLATFORM=0
DAY1_HCI=0
DAY1_REVIEW=0
START_DATE=""
CURRENT_DAY=1
EOF
    fi
    source "$PROGRESS_FILE"
}

#----------------------------------------------
# 保存进度
#----------------------------------------------
save_progress() {
    grep -v "^#" "$PROGRESS_FILE" > /tmp/prog_tmp
    cat > "$PROGRESS_FILE" << 'EOF'
# 学习进度自动生成 - 请勿手动修改
EOF
    grep -v "^#" /tmp/prog_tmp >> "$PROGRESS_FILE"
}

#----------------------------------------------
# 记录日志
#----------------------------------------------
log() {
    local msg="[$(date '+%Y-%m-%d %H:%M:%S')] $1"
    echo -e "$msg" >> "$LOG_FILE"
    echo -e "$msg"
}

#----------------------------------------------
# 打印 Banner
#----------------------------------------------
banner() {
    echo -e "${CYAN}"
    echo "╔══════════════════════════════════════════════╗"
    echo "║   MS365 & HCI VPC 六天速成 · 学习追踪器      ║"
    echo "╚══════════════════════════════════════════════╝"
    echo -e "${NC}"
}

#----------------------------------------------
# 打印当前状态
#----------------------------------------------
show_status() {
    init_progress
    source "$PROGRESS_FILE"

    banner

    local total=6
    local completed=0

    check_task() {
        [[ "${!1}" == "1" ]] && echo -e " ${GREEN}${DONE}${NC}" || echo -e " ${YELLOW}${TODO}${NC}"
    }

    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "  ${CYAN}Day 1 · Azure AD（身份与访问管理）${NC}"
    echo -e "    核心概念视频          $(check_task DAY1_AZUREAD)"
    echo -e "    Teams 管理            $(check_task DAY1_TEAMS)"
    echo -e "    Intune 设备管理       $(check_task DAY1_INTUNE)"
    echo -e "    Power Platform        $(check_task DAY1_POWERPLATFORM)"
    echo -e "    HCI 超融合基础        $(check_task DAY1_HCI)"
    echo -e "    面试场景练习          $(check_task DAY1_REVIEW)"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

    echo ""
    echo -e "  学习资源："
    echo -e "  ${CYAN}· Microsoft Learn:${NC} https://learn.microsoft.com/zh-cn/training/m365/"
    echo -e "  ${CYAN}· Azure AD:${NC}         https://learn.microsoft.com/zh-cn/azure/active-directory/"
    echo -e "  ${CYAN}· Teams 管理员：${NC}     https://learn.microsoft.com/zh-cn/microsoftteams/"

    # 计算完成百分比
    local vars=(DAY1_AZUREAD DAY1_TEAMS DAY1_INTUNE DAY1_POWERPLATFORM DAY1_HCI DAY1_REVIEW)
    for v in "${vars[@]}"; do
        [[ "${!v}" == "1" ]] && ((completed++))
    done

    local pct=$((completed * 100 / total))
    local bar_len=30
    local filled=$((pct * bar_len / 100))
    local bar=""
    for i in $(seq 1 $bar_len); do
        if [[ $i -le $filled ]]; then bar+="█"; else bar+="░"; fi
    done

    echo ""
    echo -e "  总体进度: ${GREEN}${bar}${NC} ${pct}% (${completed}/${total})"
    echo ""
}

#----------------------------------------------
# 标记任务完成
#----------------------------------------------
mark_done() {
    init_progress
    source "$PROGRESS_FILE"

    case "$1" in
        azuread)       sed -i 's/^DAY1_AZUREAD=0$/DAY1_AZUREAD=1/' "$PROGRESS_FILE" ;;
        teams)         sed -i 's/^DAY1_TEAMS=0$/DAY1_TEAMS=1/' "$PROGRESS_FILE" ;;
        intune)        sed -i 's/^DAY1_INTUNE=0$/DAY1_INTUNE=1/' "$PROGRESS_FILE" ;;
        powerplatform) sed -i 's/^DAY1_POWERPLATFORM=0$/DAY1_POWERPLATFORM=1/' "$PROGRESS_FILE" ;;
        hci)           sed -i 's/^DAY1_HCI=0$/DAY1_HCI=1/' "$PROGRESS_FILE" ;;
        review)        sed -i 's/^DAY1_REVIEW=0$/DAY1_REVIEW=1/' "$PROGRESS_FILE" ;;
        all)           sed -i 's/=0$/=1/g' "$PROGRESS_FILE" ;;
        *)             echo -e "${RED}未知任务: $1${NC}"; echo "可用: azuread, teams, intune, powerplatform, hci, review, all"; return 1 ;;
    esac

    log "${GREEN}✅ 已完成: $1${NC}"
    show_status
}

#----------------------------------------------
# 开始学习（打开资源链接）
#----------------------------------------------
start_learn() {
    init_progress
    source "$PROGRESS_FILE"

    local topic="$1"
    local url=""

    case "$topic" in
        azuread)
            url="https://www.bilibili.com/v/search/search?keyword=Azure+AD+%E5%85%A5%E9%97%A8&source=search_history&spm_id_from=333.788.videocard.0"
            echo -e "${CYAN}正在打开 Azure AD 学习资源...${NC}"
            echo -e "Microsoft Learn: ${BLUE}https://learn.microsoft.com/zh-cn/training/paths/work-identity-virtualizing-user-identities-azure-active-directory/${NC}"
            ;;
        teams)
            url="https://www.bilibili.com/v/search/search?keyword=Teams+%E4%BC%81%E4%B8%9A%E9%83%A8%E7%BD%B2&source=search_history"
            echo -e "${CYAN}正在打开 Teams 管理学习资源...${NC}"
            echo -e "Microsoft Learn: ${BLUE}https://learn.microsoft.com/zh-cn/training/paths/m365-manage-team-collaboration/${NC}"
            ;;
        intune)
            url="https://www.bilibili.com/v/search/search?keyword=Intune+%E7%A7%BB%E5%8A%A8%E8%AE%BE%E5%A4%87%E7%AE%A1%E7%90%86&source=search_history"
            echo -e "${CYAN}正在打开 Intune 学习资源...${NC}"
            echo -e "Microsoft Learn: ${BLUE}https://learn.microsoft.com/zh-cn/training/paths/manage-devices-microsoft-intune/${NC}"
            ;;
        powerplatform)
            url="https://www.bilibili.com/v/search/search?keyword=Power+Automate+%E5%85%A5%E9%97%A8&source=search_history"
            echo -e "${CYAN}正在打开 Power Platform 学习资源...${NC}"
            echo -e "Microsoft Learn: ${BLUE}https://learn.microsoft.com/zh-cn/training/paths/power-automate-founds/${NC}"
            ;;
        hci)
            url="https://www.bilibili.com/v/search/search?keyword=VMware+vSphere+%E8%99%9A%E5%90%88%E5%8C%96+%E5%85%A5%E9%97%A8&source=search_history"
            echo -e "${CYAN}正在打开 HCI 虚拟化学习资源...${NC}"
            echo -e "VMware 官方: ${BLUE}https://docs.vmware.com/cn/VMware-vSphere/index.html${NC}"
            ;;
        review)
            echo -e "${CYAN}面试场景练习开始！${NC}"
            echo -e "${YELLOW}常见问题：${NC}"
            echo "1. 介绍一下 Azure AD 的 Conditional Access"
            echo "2. 如果要给员工手机远程抹除数据，怎么做？"
            echo "3. HCI 和传统架构的区别是什么？什么时候选 HCI？"
            echo "4. M365 全家桶里你用过哪些？介绍一下"
            echo "5. Teams 的音频会议功能"
            return
            ;;
        *)
            echo -e "${RED}未知主题: $topic${NC}"
            echo "可用: azuread, teams, intune, powerplatform, hci, review"
            return 1
            ;;
    esac

    # 尝试用 termux-open 打开（会弹出选择器让用户选浏览器）
    command -v termux-open &>/dev/null && termux-open "$url" || echo -e "请手动打开: $url"
}

#----------------------------------------------
# 面试抽查
#----------------------------------------------
quiz() {
    init_progress
    source "$PROGRESS_FILE"

    local qs=(
        "Azure AD 和传统 AD 的核心区别是什么？"
        "SSO 的实现原理是什么？"
        "MFA 有哪几种认证因素？"
        "Conditional Access 的典型应用场景？"
        "Teams 的许可证类型有哪些？"
        "音频会议适合哪些参会者？"
        "MDM 和 MAM 的核心区别？"
        "Intune 合规策略可以检查哪些设备属性？"
        "Power Automate 的三种触发方式？"
        "SharePoint 和 OneDrive 的使用场景区别？"
        "HCI 相比传统三层架构的优势？"
        "vSAN 的数据冗余机制？"
        "Azure AD 的 Conditional Access 触发条件有哪些？"
    )

    local total=${#qs[@]}
    local day_prefix=""

    # 根据进度选择题目
    source "$PROGRESS_FILE" 2>/dev/null
    local day=${CURRENT_DAY:-1}

    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "  ${YELLOW}📋 面试抽查开始（共 ${total} 道高频题）${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    for i in "${!qs[@]}"; do
        local idx=$((i + 1))
        echo -e "${BLUE}[$idx/${total}]${NC} ${qs[$i]}"
        echo -e "${YELLOW}  （回车看答案，q退出）${NC}"
        read -r -p "> " answer
        if [[ "$answer" == "q" ]]; then
            echo -e "${CYAN}抽查结束！${NC}"
            return
        fi
    done

    echo ""
    echo -e "${GREEN}✅ 抽查完成！继续加油！${NC}"
}

#----------------------------------------------
# 帮助信息
#----------------------------------------------
show_help() {
    banner
    echo -e "${CYAN}用法:${NC}  bash learn.sh <命令>"
    echo ""
    echo -e "${YELLOW}学习命令:${NC}"
    echo "  status           显示当前进度状态"
    echo "  azuread          打开 Azure AD 学习资源"
    echo "  teams            打开 Teams 管理学习资源"
    echo "  intune           打开 Intune 学习资源"
    echo "  powerplatform    打开 Power Platform 学习资源"
    echo "  hci              打开 HCI 虚拟化学习资源"
    echo "  review           面试场景练习"
    echo "  quiz             面试抽查（随机问答）"
    echo ""
    echo -e "${YELLOW}进度命令:${NC}"
    echo "  done <topic>     标记任务完成 (azuread/teams/intune/powerplatform/hci/review)"
    echo "  reset            重置所有进度"
    echo ""
    echo -e "${YELLOW}示例:${NC}"
    echo "  bash learn.sh status          # 查看进度"
    echo "  bash learn.sh azuread         # 开始学 Azure AD"
    echo "  bash learn.sh done azuread    # 标记 Azure AD 已完成"
    echo "  bash learn.sh quiz            # 面试抽查"
}

#----------------------------------------------
# 主入口
#----------------------------------------------
main() {
    init_progress

    case "${1:-status}" in
        status)      show_status ;;
        azuread)    start_learn azuread ;;
        teams)      start_learn teams ;;
        intune)     start_learn intune ;;
        powerplatform) start_learn powerplatform ;;
        hci)        start_learn hci ;;
        review)     start_learn review ;;
        quiz)       quiz ;;
        done)       mark_done "${2:-}" ;;
        reset)
            rm -f "$PROGRESS_FILE"
            init_progress
            echo -e "${GREEN}进度已重置！${NC}"
            show_status
            ;;
        help|--help|-h) show_help ;;
        *)
            echo -e "${RED}未知命令: $1${NC}"
            show_help
            ;;
    esac
}

main "$@"
