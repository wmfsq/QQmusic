// 初始化VIP下拉菜单
function initVipDropdown() {
    const vipBtn = document.getElementById('vipBtn');
    const dropdownMenu = document.getElementById('vipDropdown');
    const arrow = vipBtn.querySelector('.arrow');
    let vipTimeout;

    // 鼠标进入按钮时显示下拉菜单并切换箭头
    vipBtn.addEventListener('mouseenter', function() {
        clearTimeout(vipTimeout);
        dropdownMenu.style.display = 'block';
        if (arrow) {
            arrow.textContent = '▼'; // 鼠标悬停时箭头向下
        }
    });

    // 鼠标离开按钮时延迟隐藏下拉菜单并切换箭头
    vipBtn.addEventListener('mouseleave', function() {
        vipTimeout = setTimeout(function() {
            dropdownMenu.style.display = 'none';
            if (arrow) {
                arrow.textContent = '▲'; // 鼠标离开时箭头向上
            }
        }, 200); // 延迟200毫秒隐藏
    });

    // 鼠标进入下拉菜单时保持显示
    dropdownMenu.addEventListener('mouseenter', function() {
        clearTimeout(vipTimeout);
        dropdownMenu.style.display = 'block';
        if (arrow) {
            arrow.textContent = '▼';
        }
    });

    // 鼠标离开下拉菜单时隐藏并切换箭头
    dropdownMenu.addEventListener('mouseleave', function() {
        dropdownMenu.style.display = 'none';
        if (arrow) {
            arrow.textContent = '▲';
        }
    });
}

// 初始化充值下拉菜单
function initPayDropdown() {
    const payBtn = document.getElementById('payBtn');
    const payDropdownMenu = document.getElementById('payDropdown');
    const arrow = payBtn.querySelector('.arrow');
    let payTimeout;

    // 鼠标进入按钮时显示下拉菜单并切换箭头
    payBtn.addEventListener('mouseenter', function() {
        clearTimeout(payTimeout);
        payDropdownMenu.style.display = 'block';
        if (arrow) {
            arrow.textContent = '▼'; // 鼠标悬停时箭头向下
        }
    });

    // 鼠标离开按钮时延迟隐藏下拉菜单并切换箭头
    payBtn.addEventListener('mouseleave', function() {
        payTimeout = setTimeout(function() {
            payDropdownMenu.style.display = 'none';
            if (arrow) {
                arrow.textContent = '▲'; // 鼠标离开时箭头向上
            }
        }, 200); // 延迟200毫秒隐藏
    });

    // 鼠标进入下拉菜单时保持显示
    payDropdownMenu.addEventListener('mouseenter', function() {
        clearTimeout(payTimeout);
        payDropdownMenu.style.display = 'block';
        if (arrow) {
            arrow.textContent = '▼';
        }
    });

    // 鼠标离开下拉菜单时隐藏并切换箭头
    payDropdownMenu.addEventListener('mouseleave', function() {
        payDropdownMenu.style.display = 'none';
        if (arrow) {
            arrow.textContent = '▲';
        }
    });
    
    // 获取充值饭票和开具发票元素
    const rechargeTicket = payDropdownMenu.querySelector('.recharge-ticket');
    const invoiceItem = payDropdownMenu.querySelector('.invoice-item');

    // 鼠标进入充值饭票时显示开具发票
    if (rechargeTicket && invoiceItem) {
        rechargeTicket.addEventListener('mouseenter', function() {
            invoiceItem.style.display = 'block';
        });

        // 鼠标离开充值饭票时隐藏开具发票
        rechargeTicket.addEventListener('mouseleave', function() {
            // 添加延迟，防止在切换到开具发票时立即隐藏
            setTimeout(function() {
                if (!invoiceItem.matches(':hover')) {
                    invoiceItem.style.display = 'none';
                }
            }, 100);
        });

        // 鼠标进入开具发票时保持显示
        invoiceItem.addEventListener('mouseenter', function() {
            invoiceItem.style.display = 'block';
        });

        // 鼠标离开开具发票时隐藏
        invoiceItem.addEventListener('mouseleave', function() {
            invoiceItem.style.display = 'none';
        });
    }
}

// 新歌首发标签切换和轮播功能
function initSongTabs() {
    const songTabs = document.querySelectorAll('.songs-tabs span');
    const songContainers = document.querySelectorAll('.song-item-container');
    const leftArrow = document.getElementById('leftArrow');
    const rightArrow = document.getElementById('rightArrow');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentRegion = '内地';
    let currentIndex = 0;
    
    // 标签切换功能
    songTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // 移除所有标签的active类
            songTabs.forEach(t => t.classList.remove('active'));
            // 为当前点击的标签添加active类
            this.classList.add('active');
            
            // 获取选中的地区
            const region = this.getAttribute('data-region');
            currentRegion = region;
            
            // 隐藏所有歌曲容器
            songContainers.forEach(container => {
                container.classList.remove('active');
            });
            
            // 显示对应地区的歌曲容器
            const targetContainer = document.querySelector(`.song-item-container[data-region="${region}"]`);
            if (targetContainer) {
                targetContainer.classList.add('active');
            }
            
            // 重置索引
            currentIndex = 0;
            updateIndicators();
            updateCarouselPosition();
            
            console.log(`切换到 ${region} 类型的歌曲`);
        });
    });
    
    // 更新指示器状态
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index === currentIndex) {
                indicator.classList.add('active');
            }
        });
    }
    
    // 更新轮播位置
    function updateCarouselPosition() {
        const activeContainer = document.querySelector(`.song-item-container[data-region="${currentRegion}"]`);
        if (activeContainer) {
            const translateX = -currentIndex * 270; // 250px width + 20px margin
            activeContainer.style.transform = `translateX(${translateX}px)`;
        }
    }
    
    // 轮播箭头功能 - 直接切换标签
    if (leftArrow && rightArrow) {
        leftArrow.addEventListener('click', function() {
            switchToPreviousTab();
        });
        
        rightArrow.addEventListener('click', function() {
            switchToNextTab();
        });
    }
    
    // 切换到下一个标签
    function switchToNextTab() {
        const tabsArray = Array.from(songTabs);
        const currentTab = document.querySelector(`.songs-tabs span[data-region="${currentRegion}"]`);
        const currentIndexTab = tabsArray.indexOf(currentTab);
        
        // 计算下一个标签索引（循环）
        const nextIndex = (currentIndexTab + 1) % tabsArray.length;
        const nextTab = tabsArray[nextIndex];
        
        // 触发点击事件切换到下一个标签
        nextTab.click();
    }

    // 切换到上一个标签
    function switchToPreviousTab() {
        const tabsArray = Array.from(songTabs);
        const currentTab = document.querySelector(`.songs-tabs span[data-region="${currentRegion}"]`);
        const currentIndexTab = tabsArray.indexOf(currentTab);
        
        // 计算上一个标签索引（循环）
        const prevIndex = (currentIndexTab - 1 + tabsArray.length) % tabsArray.length;
        const prevTab = tabsArray[prevIndex];
        
        // 触发点击事件切换到上一个标签
        prevTab.click();
    }
    
    // 指示器点击功能
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            currentIndex = index;
            updateIndicators();
            updateCarouselPosition();
        });
    });
}

// ... existing code ...

// 图片悬停切换功能
function initImageHover() {
    // 定义雪碧图中的悬停状态位置
    const hoverPositions = {
        'windows': '9px -34px',     // PC版悬停位置
        'mac': '-65px -34px',        // Mac版悬停位置
        'android': '-131px -34px',    // Android版悬停位置
        'iphone': '-200px -34px',     // iPhone版悬停位置
        'karaoke': '-270px -34px',    // 全民K歌悬停位置
        'supersound': '-340px -34px', // Super Sound悬停位置
        'qplay': '-410px -34px'  // QPlay悬停位置
    };

    // 获取所有需要切换的元素（现在是.platform-item和.feature-item，而不是img标签）
    const platformItems = document.querySelectorAll('.platform-item');
    const featureItems = document.querySelectorAll('.feature-item');
    
    // 为平台项添加悬停效果
    platformItems.forEach(item => {
        const classes = item.className.split(' ');
        const iconType = classes.find(cls => hoverPositions[cls]);
        
        if (iconType) {
            // 鼠标进入事件
            item.addEventListener('mouseenter', function() {
                if (hoverPositions[iconType]) {
                    this.style.backgroundPosition = hoverPositions[iconType];
                }
            });
            
            // 鼠标离开事件
            item.addEventListener('mouseleave', function() {
                // 恢复原始位置
                this.style.backgroundPosition = '';
            });
        }
    });
    
    // 为特色产品项添加悬停效果
    featureItems.forEach(item => {
        const classes = item.className.split(' ');
        const iconType = classes.find(cls => hoverPositions[cls]);
        
        if (iconType) {
            // 鼠标进入事件
            item.addEventListener('mouseenter', function() {
                if (hoverPositions[iconType]) {
                    this.style.backgroundPosition = hoverPositions[iconType];
                }
            });
            
            // 鼠标离开事件
            item.addEventListener('mouseleave', function() {
                // 恢复原始位置
                this.style.backgroundPosition = '';
            });
        }
    });
}

// ... existing code ...
// 添加置顶功能
function initPinFunction() {
    // 创建置顶按钮元素
    const pinButton = document.createElement('div');
    pinButton.id = 'pinButton';
    pinButton.innerHTML = '<span class="pin-icon">↑</span>';
    
    // 设置按钮样式
    pinButton.style.position = 'fixed';
    pinButton.style.bottom = '20px';
    pinButton.style.right = '20px';
    pinButton.style.width = '40px';
    pinButton.style.height = '40px';
    pinButton.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    pinButton.style.border = '1px solid #ddd';
    pinButton.style.display = 'flex';
    pinButton.style.alignItems = 'center';
    pinButton.style.justifyContent = 'center';
    pinButton.style.cursor = 'pointer';
    pinButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    pinButton.style.zIndex = '10000';
    pinButton.style.transition = 'all 0.3s ease';
    
    // 添加到页面
    document.body.appendChild(pinButton);
    
    // 点击置顶按钮
    pinButton.addEventListener('click', function() {
        window.scrollTo({top: 0, behavior: 'smooth'}); // 平滑滚动到顶部
    });
    
    // 监听滚动事件，控制按钮显示/隐藏
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            pinButton.style.display = 'flex'; // 滚动超过100px时显示
        } else {
            pinButton.style.display = 'none'; // 顶部100px内隐藏
        }
    });
    
    // 初始隐藏按钮
    pinButton.style.display = 'none';
}

// 页面加载完成后初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    initVipDropdown();
    initPayDropdown();
    initSongTabs();
    initImageHover();
    initPinFunction(); // 添加置顶功能
});