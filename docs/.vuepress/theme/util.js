import sidebarItems from "../config-client/sidebar";

export const hashRE = /#.*$/ // a regular expression to match the hash portion of a URL.
export const extRE = /\.(md|html)$/ // a regular expression to match file extensions.
export const endingSlashRE = /\/$/ // a regular expression to match the trailing slash in a URL.
export const outboundRE = /^(https?:|mailto:|tel:)/ //  a regular expression to match external links.

/**
 * Remove the hash and extension from a path.
 * @param path
 * @returns {string}
 */
export function normalize(path) {
    return decodeURI(path)
        .replace(hashRE, '')
        .replace(extRE, '')
}

/**
 * Get the hash portion of a path.
 * @param path
 * @returns {*}
 */
export function getHash(path) {
    const match = path?.match(hashRE)
    if (match) {
        return match[0]
    }
}

/**
 * Check if a path is external.
 * @param path
 * @returns {boolean}
 */
export function isExternal(path) {
    return outboundRE.test(path)
}

/**
 * Check if a path is a mailto link.
 * @param path
 * @returns {string|*}
 */

export function ensureExt(path) {
    if (isExternal(path)) {
        return path
    }
    const hashMatch = path?.match(hashRE)
    const hash = hashMatch ? hashMatch[0] : ''
    const normalized = normalize(path)

    if (endingSlashRE.test(normalized)) {
        return path
    }
    return normalized + '.html' + hash
}

/**
 * Check if a path is active.
 * This is used to determine if a link should be highlighted.
 * It compares the path of the current route with the path of the link.
 * @param route
 * @param path
 * @returns {boolean}
 */
export function isActive(route, path) {
    const routeHash = route.hash
    const linkHash = getHash(path)
    if (linkHash && routeHash !== linkHash) {
        return false
    }
    const routePath = normalize(route.path)
    const pagePath = normalize(path)
    return routePath === pagePath
}

/**
 * Resolve a page from a list of pages.
 * This is used to resolve the page for a sidebar item.
 * Function to find a matching page object given its path.
 * @param pages
 * @param rawPath
 * @param base
 * @returns {{}|any}
 */

export function resolvePage(pages, rawPath, base) {
    if (base) {
        rawPath = resolvePath(rawPath, base)
    }
    const path = normalize(rawPath)
    for (let i = 0; i < pages.length; i++) {
        if (normalize(pages[i].path) === path) {
            return Object.assign({}, pages[i], {
                type: 'page',
                path: ensureExt(rawPath),
                relativePath: `${rawPath.slice(1)}README.md`,
                regularPath: rawPath,
            })
        }
    }
    return null
}

/**
 * Resolve a path relative to a base path.
 * This is used to resolve the path of a page relative to the base path.
 * @param relative
 * @param base
 * @param append
 * @returns {*}
 */

function resolvePath(relative, base, append) {
    const firstChar = relative.charAt(0)
    if (firstChar === '/') {
        return relative
    }

    if (firstChar === '?' || firstChar === '#') {
        return base + relative
    }

    const stack = base.split('/')

    // remove trailing segment if:
    // - not appending
    // - appending to trailing slash (last segment is empty)
    if (!append || !stack[stack.length - 1]) {
        stack.pop()
    }

    // resolve relative path
    const segments = relative.replace(/^\//, '').split('/')
    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i]
        if (segment === '..') {
            stack.pop()
        } else if (segment !== '.') {
            stack.push(segment)
        }
    }

    // ensure leading slash
    if (stack[0] !== '') {
        stack.unshift('')
    }

    return stack.join('/')
}

/**
 * Resolve a sidebar item.
 * This is used to resolve a sidebar item to a page object or a group of children.
 * Function to resolve the sidebar items for a page.
 * @param page
 * @param route
 * @param pages
 * @param sidebar
 * @returns {*|*[]|[{children: *, collapsable: boolean, type: string, title: *}]}
 */

export function resolveSidebarItems(page, route, pages) {
    const {base, config} = resolveMatchingConfig(route, sidebarItems)
    return config
        ? config.map(item => resolveItem(item, pages, base))
        : []
}

/**
 * Resolve a sidebar item to a page object or a group of children.
 * @param page
 * @returns {[{children: *, collapsable: boolean, type: string, title}]}
 */
function resolveHeaders(page) {
    const headers = groupHeaders(page.headers || [])
    return [{
        type: 'group',
        collapsable: false,
        title: page.title,
        children: headers.map(h => {
            return {
                type: 'auto',
                title: h.title,
                basePath: page.path,
                path: page.path + '#' + h.slug,
                children: h.children || []
            }
        })
    }]
}

/**
 *  Resolve a sidebar item to a page object or a group of children.
 *  Function to resolve a sidebar item to a page object or a group of children.
 * @param headers
 * @returns {*}
 */

export function groupHeaders(headers) {
    headers = headers.map(h => Object.assign({}, JSON.parse(JSON.stringify(h))))
    let lastH2
    headers.forEach(h => {
        if (h.level !== 1) {
            lastH2 = h
        } else if (lastH2) {
            (lastH2.children || (lastH2.children = [])).push(h)
        }
    })
    return headers.filter(h => h.level !== 1)
}

/**
 * Resolve a matching config for a route.
 * This is used to resolve the config for a sidebar.
 * Function to resolve the matching config for a route.
 * @param route
 * @param config
 * @returns {{config, base: string}|{}|{config: *, base: string}}
 */

export function resolveMatchingConfig(route, config) {
    if (Array.isArray(config)) {
        return {
            base: '/',
            config: config
        }
    }

    for (const base in config) {
        if (ensureEndingSlash(route.path).indexOf(base) === 0) {
            return {
                base,
                config: config[base]
            }
        }
    }
    return null
}

function ensureEndingSlash(path) {
    return /(\.html|\/)$/.test(path)
        ? path
        : path + '/'
}


/**
 * Resolve a sidebar item to a page object or a group of children.
 * Function to resolve a sidebar item to a page object or a group of children.
 * @param item
 * @param pages
 * @param base
 * @param isNested
 * @returns {any}
 */

function resolveItem(item, pages, base, isNested) {
    if (typeof item === 'string') return resolvePage(pages, item, base)
    else if (Array.isArray(item)) return Object.assign(resolvePage(pages, item[0], base), {
        title: item[1]
    })
    else {
        if (isNested) console.error(
            '[vuepress] Nested sidebar groups are not supported. ' +
            'Consider using navbar + categories instead.'
        )
        const children = item.children || []

        return {
            type: 'group',
            title: item.title,
            children: children.map(child => resolveItem(child, pages, base, true)),
            collapsable: item.collapsable !== false,
        }
    }
}
