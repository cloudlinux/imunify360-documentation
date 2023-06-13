<script>
import {groupHeaders, isActive} from '../util'
import {h} from "vue"
import {usePageData} from "@vuepress/client";
import {RouterLink, useRoute,useRouter} from "vue-router";

export default {
  functional: true,
  props: ['item', 'closeSidebarDrawer'],
  render({item,closeSidebarDrawer}) {
    if (!item) return;
    const $page = usePageData();
    const $route = useRoute();
    const $router = useRouter();
    const selfActive = isActive($route, item?.path);
    const active = item?.type === 'auto'
        ? selfActive || item.children.some(c => isActive($route, item.basePath + '#' + c.slug))
        : selfActive;
    const link = renderHeader(h, item?.path, item.title || item?.path, active, item.headers,closeSidebarDrawer,$router);
    const configDepth = $page.value.frontmatter?.sidebarDepth != null
        ? $page.value.frontmatter?.sidebarDepth
        : 5;
    const maxDepth = configDepth == null ? 1 : configDepth;
    if (item?.type === 'auto') {
      return [link, renderChildren(h, item.children, item.basePath, $route, maxDepth,1,closeSidebarDrawer)]
    } else {
      if (item.headers && item.headers.length) {
        const children = groupHeaders(item.headers);
        return [link, renderChildren(h, children, item?.path, $route, maxDepth, 1,closeSidebarDrawer)];
      }
      return renderLink(h, item?.path, item.title || item?.path, active, item.children,0,closeSidebarDrawer);
    }
  }
}

function renderLink(h, to, text, active, children, depth = 0,closeSidebarDrawer) {
  const link = h(RouterLink, {
    'data-anchor': to,
    to,
    activeClass: '',
    exactActiveClass: '',
    class: {
      active,
      'sidebar-link': true,
      ['link-depth-level-' + depth]: true,
    },
  }, () => [text]);
  return h('div', {
    class: {
      active,
      'collapsed': true,
      'sidebar-link-container': !!children?.length
    },
    onClick: (e) => {
      const classes = e.target.classList;
      classes.toggle('collapsed')
      e.target.tagName !== 'DIV' && closeSidebarDrawer()
    },
  }, [link]);
}

function renderHeader(h, to, text, active, childHeaders,closeSidebarDrawer,$router) {
  const hasDirectChildren = !!childHeaders && childHeaders.some(child => child.level !== 1);
  return h('div', {
    class: {
      active,
      'collapsed': active,
      'sidebar-header': true,
      'sidebar-link': true,
      'sidebar-header--empty': !hasDirectChildren,
    },
    onClick: (e) => {
      const classes = e.target.classList;
      const link = e.target.querySelector('a');
      classes.toggle('collapsed')
      link && $router.push(link.getAttribute('href'))
    }
  }, [renderLink(h, to, text, active, null,0,closeSidebarDrawer)])
}

function renderChildren(h, children, path, route, maxDepth, depth = 1,closeSidebarDrawer) {
  if (!children || depth > maxDepth) return null;

  return h('ul', {class: 'sidebar-sub-headers'}, children.map(c => {
    const active = isActive(route, path + '#' + c.slug);
    return h('li', {
      class: {
        'collapsible': depth < 3,
        'sidebar-sub-header': true
      }
    }, [
      renderLink(h, path + '#' + c.slug, c.title, active, c.children, depth,closeSidebarDrawer),
      renderChildren(h, c.children, path, route, maxDepth, depth + 1,closeSidebarDrawer)
    ])
  }))
}
</script>

<style lang="stylus">
@import '../../styles/config.styl'

.sidebar .sidebar-sub-header
  font-size 0.95em

  &.collapsible
    & > div
      margin-left 2rem

    & > .sidebar-link-container
      background-image url("../../public/expand-more-down.svg")
      background-repeat no-repeat
      background-position: left 1.0625rem top 1rem
      background-size 1rem 0.5625rem
      padding-left 2rem
      cursor pointer
      margin-left 0

      &.active
        background-color: $alice-blue;

      &.collapsed
        background-image url("../../public/expand-more.svg")
        background-size 1rem 0.5625rem
        background-position: left 1.0625rem top 0.90625rem

        & + .sidebar-sub-headers
          display none

      .sidebar-link
        padding-left 0
        margin-left 1rem

  .sidebar-sub-headers
    margin-left 3rem

    &:first-child
      margin-left 0


.sidebar-link
  font-weight 400
  display inline-block
  color $textColor
  margin 0
  line-height 1.4
  cursor pointer

  &.sidebar-header
    background-image url("../../public/expand-more.svg")
    background-repeat no-repeat
    background-position left 5px center
    background-size 1rem 0.5625rem
    position relative
    &:not(.sidebar-header--empty)::before
      content: ''
      position: absolute
      width: 100%
      height: 100%

    & + .sidebar-sub-headers
      display none

    &.collapsed
      border-left-color $accentColor
      background-image url("../../public/expand-more-down.svg")
      background-size 1rem 0.5625rem
      background-position left 5px center


  &:hover
    color $accentColor

  &.active
    font-weight 600
    color $sidebarHeadingColorText

  &.collapsed + .sidebar-sub-headers
    display block

  .sidebar-group &
    padding 0.6rem 0 0.6rem 0.43rem

  .sidebar-group &.sidebar-header
    padding 0 0 0 2rem

  .sidebar-header &
    margin 0
    padding 0.55rem 0 0.5rem 0

  .sidebar-sub-headers &
    &.active
      font-weight 500
      border-right 3px solid $accentColor

.sidebar-header--empty
  background-image none !important

@media (max-width: $mobileBreakpoint)

  .sidebar-sub-headers:has(.sidebar-sub-header > div.active)
    margin-left 0

  .sidebar .sidebar-sub-header .sidebar-sub-headers > .sidebar-sub-header > div:not(.active)
    margin-left 3.2rem

  .sidebar .sidebar-sub-header .sidebar-sub-headers
    margin-left 0

  .sidebar-sub-headers > div:is(.active)
    margin 0 !important;

  .sidebar-link.sidebar-header, .sidebar-link.sidebar-header.collapsed
    background-position left 2px center

  .sidebar .sidebar-sub-header.collapsible > div:is(.active)
    margin 0 !important

  .sidebar-sub-headers .sidebar-link.active
    border-right none !important
    border-radius 7px
    padding-left 3.5rem

  .sidebar .sidebar-sub-header.collapsible > .sidebar-link-container.active
    background-color: $sidebarActiveColor !important
    border-radius 7px

  .active:is(.active > .link-depth-level-1)
    background $sidebarActiveColor
    border-right none !important
    border-radius 7px
    padding-left 2.65rem

  .active:is(.active > .link-depth-level-3)
    padding-left 7rem !important
</style>
