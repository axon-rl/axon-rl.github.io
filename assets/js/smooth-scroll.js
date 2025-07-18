// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function () {

    // Function to smooth scroll to target element
    function smoothScrollTo(target, duration = 300) {
        const targetElement = document.querySelector(target);
        if (!targetElement) {
            console.warn(`Target element not found: ${target}`);
            return false;
        }

        const startPosition = window.pageYOffset;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        // Offset for fixed header (adjust based on header height)
        const offsetPosition = targetPosition - 120;
        const distance = offsetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Easing function for smooth animation
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
        return true;
    }

    // Handle all anchor links with hash
    function handleAnchorClick(e) {
        const href = this.getAttribute('href');

        // Check if it's an anchor link (starts with # or contains #)
        if (href && href.includes('#')) {
            const hashIndex = href.indexOf('#');
            const hash = href.substring(hashIndex);
            const path = href.substring(0, hashIndex);

            // If it's a same-page anchor or external anchor to current page
            if (hash && (path === '' || path === window.location.pathname)) {
                e.preventDefault();

                // Update URL without jumping
                if (window.history && window.history.pushState) {
                    window.history.pushState(null, null, hash);
                }

                // Handle active states immediately
                updateActiveNavItem(this);

                // Smooth scroll to target
                smoothScrollTo(hash);
            } else if (hash && path !== '') {
                // For cross-page navigation, just update active state before navigation
                updateActiveNavItem(this);
                // Let the browser handle the navigation normally
            }
        }
    }

    // Update active navigation item
    function updateActiveNavItem(clickedLink) {
        // Prevent intersection observer from interfering with manual navigation
        if (manualNavigationTimeout) {
            clearTimeout(manualNavigationTimeout);
        }
        manualNavigationTimeout = setTimeout(() => {
            manualNavigationTimeout = null;
        }, 0); // Wait 0.1 seconds before allowing automatic updates

        // Remove active class from all nav links
        document.querySelectorAll('.gem-sidebar a').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to clicked link
        clickedLink.classList.add('active');
        
        // Scroll the sidebar to center the active item
        scrollSidebarToActiveItem(clickedLink);
    }
    
    // Function to scroll sidebar to center the active navigation item
    function scrollSidebarToActiveItem(activeLink) {
        const sidebar = document.querySelector('.gem-sidebar');
        if (!sidebar || !activeLink) return;
        
        // Get the position of the active link relative to the sidebar's scrollable content
        const linkOffsetTop = activeLink.offsetTop;
        const linkHeight = activeLink.offsetHeight;
        const sidebarHeight = sidebar.clientHeight;
        
        // Calculate the scroll position to center the active link
        const targetScrollTop = linkOffsetTop - (sidebarHeight / 2) + (linkHeight / 2);
        
        // Smooth scroll the sidebar
        sidebar.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth'
        });
    }

    // Attach click handlers to all links
    document.querySelectorAll('a[href*="#"]').forEach(link => {
        link.addEventListener('click', handleAnchorClick);
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function () {
        if (window.location.hash) {
            // Update active nav item for back/forward navigation immediately
            const hashId = window.location.hash.substring(1);
            const navLink = document.querySelector(`.gem-sidebar a[href$="#${hashId}"]`);
            if (navLink) {
                document.querySelectorAll('.gem-sidebar a').forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
                activeSection = hashId;
                // Center the active item in sidebar
                scrollSidebarToActiveItem(navLink);
            }
            smoothScrollTo(window.location.hash);
        }
    });

    // Intersection Observer for updating active nav items based on scroll position
    const observerOptions = {
        root: null,
        rootMargin: '-120px 0px -60% 0px', // Account for header offset
        threshold: [0, 0.1, 0.5, 1]
    };

    let activeSection = null;
    let manualNavigationTimeout = null;

    const observer = new IntersectionObserver((entries) => {
        // Don't update navigation if we're in the middle of manual navigation
        if (manualNavigationTimeout) return;

        // Sort entries by intersection ratio (most visible first)
        const visibleEntries = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
            const mostVisible = visibleEntries[0];
            const id = mostVisible.target.getAttribute('id');

            if (id && id !== activeSection) {
                activeSection = id;

                // Find corresponding nav link and make it active
                // Look for links that end with the current hash (handles both same-page and cross-page links)
                const navLink = document.querySelector(`.gem-sidebar a[href$="#${id}"]`);
                if (navLink) {
                    // Remove active from all links
                    document.querySelectorAll('.gem-sidebar a').forEach(link => {
                        link.classList.remove('active');
                    });
                    // Add active to current
                    navLink.classList.add('active');
                    
                    // Center the active item in sidebar (but only during automatic scroll tracking)
                    scrollSidebarToActiveItem(navLink);

                    // Update URL without triggering scroll
                    if (window.history && window.history.replaceState) {
                        window.history.replaceState(null, null, `#${id}`);
                    }
                }
            }
        }
    }, observerOptions);

    // Observe all headings and sections with IDs
    document.querySelectorAll('h2[id], h3[id], section[id], .expandable-section[id]').forEach(section => {
        observer.observe(section);
    });

    // Initialize active state based on current page and hash
    function initializeActiveNavigation() {
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;

        if (currentHash) {
            // If there's a hash, find the corresponding nav link
            const hashId = currentHash.substring(1);
            const navLink = document.querySelector(`.gem-sidebar a[href$="#${hashId}"]`);
            if (navLink) {
                navLink.classList.add('active');
                activeSection = hashId;
                // Center the active item in sidebar
                scrollSidebarToActiveItem(navLink);
                // Scroll to the hash section immediately
                smoothScrollTo(currentHash);
                return;
            }
        }

        // If no hash or hash not found, highlight the page overview link
        let pageOverviewLink = null;

        // Try to find exact page match first
        pageOverviewLink = document.querySelector(`.gem-sidebar a[href="${currentPath}"]`);

        // If not found, try to find a link that matches the path without trailing slash
        if (!pageOverviewLink) {
            const pathWithoutSlash = currentPath.replace(/\/$/, '');
            pageOverviewLink = document.querySelector(`.gem-sidebar a[href="${pathWithoutSlash}"]`);
        }

        // If still not found, try to find a link that matches the path with trailing slash
        if (!pageOverviewLink && !currentPath.endsWith('/')) {
            pageOverviewLink = document.querySelector(`.gem-sidebar a[href="${currentPath}/"]`);
        }

        // If we found the page overview link, make it active
        if (pageOverviewLink) {
            pageOverviewLink.classList.add('active');
            // Center the active item in sidebar
            scrollSidebarToActiveItem(pageOverviewLink);
        } else {
            // Fallback: Set first nav link as active
            const firstNavLink = document.querySelector('.gem-sidebar a');
            if (firstNavLink) {
                firstNavLink.classList.add('active');
                // Center the active item in sidebar
                scrollSidebarToActiveItem(firstNavLink);
            }
        }
    }

    initializeActiveNavigation();

});