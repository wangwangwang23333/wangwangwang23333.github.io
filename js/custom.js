document.documentElement.setAttribute('data-theme', 'light');

document.addEventListener("DOMContentLoaded", function() {
    updateCommentsAndStatus();
});

function updateCommentsAndStatus() {
    var comments = document.querySelectorAll('.comment');
    var today = new Date().toISOString().slice(0, 10); // 获取当前日期，格式为"YYYY-MM-DD"

    comments.forEach(function(comment) {
        var commentDate = comment.getAttribute('data-date');
        if (today >= commentDate) {
            comment.style.display = "block"; // 显示符合条件的评论
            updateStatus(comment, today); // 更新状态
        } else {
            comment.style.display = "none"; // 隐藏不符合条件的评论
        }
    });
}

function updateStatus(comment, today) {
    var statusIndicator = comment.querySelector('.status-indicator');
    var person = statusIndicator.className.split(' ')[1]; // 获取人物的类名，如 'xiaofang'
    var status = getStatus(person, today); // 获取当前日期的状态
    statusIndicator.className = `status-indicator status-${status}`; // 更新状态类
}

function getStatus(person, date) {
    const dayOfWeek = new Date(date).getDay();
    const statusRules = {
        xiaofang: { '2024-12-12': 'onsite' },
        xiaoliang: { '2024-12-12': 'onsite' },
        xiaochen: { '2024-12-08': 'online', '2024-12-09': 'online', '2024-12-12': 'onsite' },
        xiaowang: { '2024-12-07': 'online', '2024-12-08': 'online', '2024-12-09': 'online', '2024-12-10': 'online', '2024-12-12': 'onsite' },
        xiaojiao: { '2024-12-05': 'onsite', '2024-12-06': 'onsite', '2024-12-07': 'onsite', '2024-12-08': 'onsite', '2024-12-09': 'onsite', '2024-12-10': 'emergency', '2024-12-11': 'emergency', '2024-12-12': 'emergency' },
        rene: { // Rene 的状态根据星期决定
            '0': 'online',  // 星期日
            '1': 'emergency', // 星期一
            '2': 'emergency', // 星期二
            '3': 'emergency', // 星期三
            '4': 'onsite',   // 星期四
            '5': 'onsite',   // 星期五
            '6': 'online'   // 星期六
        },
        lurenjia: {
            '0': 'emergency',  // 星期日
            '1': 'onsite', // 星期一
            '2': 'onsite', // 星期二
            '3': 'online', // 星期三
            '4': 'online',   // 星期四
            '5': 'online',   // 星期五
            '6': 'emergency'   // 星期六
        },
        jishuzhai: {
            // 一周5天上班，周日休息
            '0': 'idle',  // 星期日
            '1': 'onsite', // 星期一
            '2': 'onsite', // 星期二
            '3': 'onsite', // 星期三
            '4': 'onsite',   // 星期四
            '5': 'onsite',   // 星期五
            '6': 'idle'   // 星期六
        }
    };
    if (person === 'rene' || person === 'lurenjia') {
        return statusRules[person][dayOfWeek];
    }
    if (person === 'yueguang') {
        return 'emergency';
    }

    // 默认状态为 idle
    var defaultStatus = 'idle';
    var personStatuses = statusRules[person];
    if (personStatuses && personStatuses[date]) {
        return personStatuses[date];
    }

    return defaultStatus; // 如果没有特定日期的状态规则，则返回 idle
}