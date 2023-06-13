<template>
  <div class="theme-container">
    Not found
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {pagesData} from "../../.temp/internal/pagesData.js";
const route = useRoute()
const router = useRouter()
const allPages = ref([])

const redirectList = [
  {
    from: "cloudlinux-os-plus/#get-started",
    to: "shared-pro/accelerate-wp/#get-started"
  },
  {
    from: "cloudlinux-os-plus/#setup-upgrade-url-for-acceleratewp-premium",
    to: "shared-pro/accelerate-wp/#setup-upgrade-url-for-acceleratewp-premium"
  },
  {
    from: "cloudlinux-os-plus",
    to: "shared-pro"
  }
]

onMounted(()=>{
  const fullPath = route.path + route.hash;
  const regex = new RegExp(fullPath,'gi')

  let haveSolution = false;

  const getRecursiveLevelPath = (child, rootPath) => {
    if (haveSolution) return;

    if(child.children?.length > 0) {
      for (let h of child.children) {
        const path = rootPath + "/" + h.link

        if (path.search(regex) !== -1) {
          router.push(path)
          haveSolution = true
          return;
        }

        if (child.children.length > 0) {
          getRecursiveLevelPath(h, rootPath)
        }
      }
    }
  }

  const redirectionURL = async () => {
    const values = Object?.values(pagesData);

    for (let redirection of redirectList) {
      if (fullPath.search(redirection.from) !== -1) {
        const path = fullPath.replace(redirection.from, redirection.to);

        router.push(path);
        return;
      }
    }

    for (let value of values) {
      const res = await value();

      let rootPath = res.path;

      if (rootPath.at(-1) === "/")
        rootPath = rootPath.slice(0, -1);

      if(res.headers?.length > 0) {
        for (let h of res.headers) {
          const path = rootPath + "/" + h.link

          if (path.search(regex) !== -1){
            router.push(path)
            haveSolution = true
            return;
          }

          getRecursiveLevelPath(h, rootPath);
        }
      }
    }
  };

  redirectionURL();
})
</script>
