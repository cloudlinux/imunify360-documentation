<template>
  <section v-if="data.length" class="drawer-main__search-results">
    <template v-for="(item, index) in visibleResults" :key="item.objectID || index">
      <div class="search-result" @click="gotTo(parseUrl(item.url))">
        <a :href="item.url" class="search-result__title" v-html="highlightMatchingWords(getTitleForArticle(item.title), modelValue)"></a>
        <div
          class="search-result__breadcrumb"
          v-html="highlightMatchingWords(getBreadcrumbsForArticle(item.title), modelValue)"
        ></div>
        <div
          class="search-result__text"
          v-html="highlightMatchingWords(formatPreviewMarkdown(item.preview), modelValue)"
        ></div>
      </div>
    </template>
    <div v-if="countOfHiddenResults > 0" class="show-more" @click="showAllHiddenResult">
      <p>Show {{ countOfHiddenResults }} more results</p>
    </div>
  </section>
  <div v-else>
    <p v-if="!modelValue.length" class="no_results">Please type your search query, then press Enter or click the search button.</p>
  </div>
</template>

<script setup>
import { computed, inject, ref } from "vue";
import { marked } from "marked";

const renderer = new marked.Renderer();

renderer.heading = function (text) {
  if (typeof text !== "string") return "";
  return `<strong>${text}</strong>`;
};

renderer.image = function () {
  return "";
};

renderer.table = function () {
  return "";
}

const formatPreviewMarkdown = (markdown) => {
  let md = marked(markdown, { renderer });
  md = md.replace(/<br>/g, ""); // Remove all <br> tags
  return md;
};

const props = defineProps({
  data: {
    type: [Array, Object],
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
});

const { MAX_VISIBLE_RESULT } = inject("themeConfig");
const isShowAllResult = ref(false);

const gotTo = (url) => {
  const parsedCurrentUrl = new URL(window.location.href);
  if (parsedCurrentUrl.pathname + parsedCurrentUrl.hash === url) {
    window.location.reload();
    return;
  }
  window.location.href = parsedCurrentUrl.origin + url;
};

const parseUrl = (url) => {
  const parsed = new URL(url);
  return parsed.pathname + parsed.hash;
};

const visibleResults = computed(() => {
  return isShowAllResult.value ? props.data : props.data?.slice(0, MAX_VISIBLE_RESULT);
});

const countOfHiddenResults = computed(() => {
  return props.data.length - visibleResults.value.length;
});

const showAllHiddenResult = () => {
  isShowAllResult.value = true;
};

const getTitleForArticle = (title) => {
  let sliced = title.split("->").map((part) => part.trim());
  return sliced.pop();
};

const getBreadcrumbsForArticle = (title) => {
  let sliced = title.split("->").map((part) => part.trim());
  sliced.pop();
  return sliced.join(" > ");
};

// Function to highlight matching words
const highlightMatchingWords = (text, query) => {
  if (!query.trim()) return text; // If the query is empty, return the text as is

  const regex = new RegExp(`(${query.split(/\s+/).join("|")})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
};
</script>

<style lang="stylus">
@import "../../styles/config.styl";

.drawer-main__search-results {
  display: grid;
  grid-template-columns: repeat(3, 1fr); // Ensures exactly 3 columns on desktop
  gap: 1.2rem;
  padding: 0.5rem; // Padding around the results area
  width: 80vw;
  margin: 0 auto;
}

.search-result {
  padding: 1rem;
  border: 1px solid $drawerSearchBorderColor;
  border-radius: 10px; // More rounded corners
  background: $searchResultBackgroundColor; // Added background color for better visibility
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Shadow for elevation
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // Increased shadow on hover
    transform: translateY(-2px);
    .search-result__title {
      color: $mainColor;
      text-decoration: underline;
    }
  }

  &__title {
    font-size: $drawerSearchResultTitleFontSize;
    font-weight: $drawerSearchResultTitleWeight;
    color: $drawerSearchResultTitleColor;
    margin: 0;
    line-height: 1.4; // Increased line height for better readability
  }

  &__text {
    font-size: $drawerSearchResultTextFontSize;
    line-height: $drawerSearchResultTextLineHeight;
    color: $drawerSearchResultTextColor;
    margin: 0.5rem 0; // Added margin for spacing
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5; // Limit preview text lines for coherence
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
  }

  &__breadcrumb {
    font-size: $drawerSearchResultBreadcrumbTextSize;
    color: $drawerSearchResultBreadcrumbColor;
    margin: 0;
    line-height: 1.4;
    margin-top: 0.5rem;
  }
}

.show-more {
  text-align: center;
  margin: 1rem 0;
  cursor: pointer;

  p {
    color: $mainColor;
    font-weight: bold;
  }
}

.no_results {
  font-size: 1.5625rem;
  text-align: center;
}

@media (max-width: $mobileBreakpoint) {
  .drawer-main__search-results {
    grid-template-columns: 1fr; // Single column on mobile
  }

  .no_results {
    font-size: 1.25rem;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .drawer-main__search-results {
    grid-template-columns: repeat(2, 1fr); // 2 columns on tablets
  }
}
</style>