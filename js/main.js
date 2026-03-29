(function() {
    var header = document.getElementById('header');
    var menuToggle = document.getElementById('menu-toggle');
    var nav = document.getElementById('nav');
    var navItems = document.querySelectorAll('.nav-item');
    var backTop = document.getElementById('back-top');
    var contactForm = document.getElementById('contact-form');

    function handleScroll() {
        var scrollY = window.scrollY;

        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (scrollY > 400) {
            backTop.classList.add('visible');
        } else {
            backTop.classList.remove('visible');
        }

        updateActiveNav();
    }

    function updateActiveNav() {
        var sections = document.querySelectorAll('section[id]');
        var scrollPos = window.scrollY + 150;

        sections.forEach(function(section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navItems.forEach(function(item) {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + id) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', handleScroll);

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    navItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            var target = document.querySelector(targetId);

            if (target) {
                var offsetTop = target.offsetTop - 72;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    backTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('感谢您的留言，我们会尽快与您联系！');
            contactForm.reset();
        });
    }

    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    var fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    var fadeElements = document.querySelectorAll('.service-card, .work-card, .tech-category, .step');
    fadeElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });

    handleScroll();
})();
