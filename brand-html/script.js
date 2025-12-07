// 导航栏滚动效果
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }

    // 设置当前页面的导航链接为active
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 表单提交处理
    const consultationForm = document.getElementById('consultation-form');
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 显示成功消息
            const successDiv = document.getElementById('form-success');
            if (successDiv) {
                successDiv.style.display = 'flex';
                consultationForm.style.display = 'none';
                
                // 3秒后恢复表单
                setTimeout(function() {
                    successDiv.style.display = 'none';
                    consultationForm.style.display = 'block';
                    consultationForm.reset();
                }, 3000);
            }
        });
    }

    // 会员登录/登出功能
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const membershipLocked = document.getElementById('membership-locked');
    const membershipContent = document.getElementById('membership-content');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            // 简单的登录模拟
            localStorage.setItem('isLoggedIn', 'true');
            updateMembershipUI();
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.setItem('isLoggedIn', 'false');
            updateMembershipUI();
        });
    }

    function updateMembershipUI() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (membershipLocked && membershipContent) {
            if (isLoggedIn) {
                membershipLocked.style.display = 'none';
                membershipContent.style.display = 'block';
                if (logoutBtn) logoutBtn.style.display = 'block';
                if (loginBtn) loginBtn.style.display = 'none';
            } else {
                membershipLocked.style.display = 'block';
                membershipContent.style.display = 'none';
                if (logoutBtn) logoutBtn.style.display = 'none';
                if (loginBtn) loginBtn.style.display = 'block';
            }
        }
    }

    // 页面加载时检查登录状态
    updateMembershipUI();
});



