import { provide, onMounted, onBeforeUnmount, nextTick } from "vue";
import { defineClientConfig } from "@vuepress/client";
import mitt from 'mitt';
import Layout from "./theme/layouts/Layout.vue";
import HomeLayout from "./theme/layouts/HomeLayout.vue";
import NotFound from "./theme/layouts/NotFound.vue";
import bottomLinks from "./config-client/bottomLinks";
import navbarLinks from "./config-client/navbarLinks";
import documents from "./config-client/documents";
import sidebar from "./config-client/sidebar";
import social from "./config-client/social";
import Chat from "./components/Chat.vue";

declare const __VUEPRESS_DEV__: boolean;

export default defineClientConfig({
    rootComponents: [
        Chat,
    ],
    async enhance({ app, router }) {
        // Existing event bus setup
        app.config.globalProperties.$eventBus = mitt();

        // Add anchor navigation handling
        if (!__VUEPRESS_DEV__) {
            const handleAnchorClick = (event: MouseEvent) => {
                const target = event.target as HTMLElement;
                const anchor = target.closest('a');
                
                if (anchor?.hash && anchor.origin === window.location.origin) {
                    event.preventDefault();
                    
                    const hash = anchor.hash;
                    nextTick(() => {
                        const element = document.querySelector(hash);
                        if (element) {
                            // Add offset for fixed header if needed
                            const headerOffset = 80; // Adjust based on your header height
                            const elementPosition = element.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            });
                            
                            // Update URL without full page reload
                            window.history.pushState(null, '', hash);
                        }
                    });
                }
            };

            // Handle initial hash on page load
            router.afterEach(() => {
                if (window.location.hash) {
                    nextTick(() => {
                        const element = document.querySelector(window.location.hash);
                        if (element) {
                            const headerOffset = 80; // Adjust based on your header height
                            const elementPosition = element.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            });
                        }
                    });
                }
            });

            // Add event listeners
            onMounted(() => {
                document.addEventListener('click', handleAnchorClick);
            });

            onBeforeUnmount(() => {
                document.removeEventListener('click', handleAnchorClick);
            });
        }
    },
    layouts: {
        Layout,
        HomeLayout,
        NotFound
    },
    setup() {
        provide('themeConfig', {
            //general
            cloudlinuxSite: "https://cloudlinux.com",
            defaultURL: "/",
            githubBranch: "master",
            allowGithubEdit: true,
            githubMainDir: "docs",
            githubRepository: "cloudlinux/imunify360-documentation",
            MOBILE_BREAKPOINT: 767,
            //docs cards
            documents,
            // icons
            arrowDownIcon: "arrows/arrow-down.svg",
            githubEditIcon: 'global/pen.svg',
            footerCustomLogo: 'global/we-are-cloudlinux.svg',
            headerDefaultSearchIcon: 'global/search.svg',
            siteLogo: "global/logo.svg",
            searchSelectIcon: 'arrows/select-down.svg',
            headerSearchIcon: 'global/header-search.svg',
            // Header
            headerSearch: "Imunify360 Product Documentation",
            headerSearchPlaceholder: "Search across all Imunify360 product documentation",
            //locales
            locales: {
                bottomLinks,
                editLinkText: "Edit this page",
                sidebar,
                siteTitle: "Documentation",
                stayInTouch: "Stay in touch",
                navbarLinks: navbarLinks,
            },
            // Products
            productsList: ['Cloudlinux', 'Imunify', 'TuxCare'],
            productsTitle: 'Products',
            productsURLs: ['https://docs.cloudlinux.com', 'https://docs.imunify360.com', 'https://docs.tuxcare.com'],
            //social links for footer
            social,
            // Algolia
            algoliaOptions: {
                apiKey: "e6b9d79daf71aa98e2e2a51d4556f9d4",
                indexName: "imunify360-unified",
                appId: "0TCNL6CGX8",
            },
            MAX_VISIBLE_RESULT: 12,
            MAX_VISIBLE_ROWS: 12,
            MAX_HITS_PER_PAGE: 12,
        })
    }
})
