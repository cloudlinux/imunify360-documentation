<template>
  <div class="custom-container">
    <div class="not-found-content">
      <div class="error-header">
        <div class="error-code">404</div>
        <h1>Page Not Found</h1>
        <p class="error-message">Sorry, the page you are looking for does not exist.</p>
        <button @click="goHome" class="primary-button">
          <span class="button-icon">←</span> Back to Home
        </button>
      </div>
      
      <div class="documents-section">
        <h2>Browse Our Documentation</h2>
        <div class="documents-cards">
          <div v-for="doc in docs" :key="doc.link" class="card">
            <div class="card-content">
              <h3>{{ doc.title }}</h3>
              <p>{{ doc.description }}</p>
            </div>
            <div class="card-footer">
              <button @click="navigateTo(doc.link)" class="card-button">
                Read More <span class="button-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { pagesData } from "../../.temp/internal/pagesData.js";
import documents from "../../config-client/documents";

const route = useRoute();
const router = useRouter();
const docs = ref(documents);

const goHome = () => {
  router.push("/");
};

const navigateTo = (link) => {
  router.push(link);
};

const getRecursiveLevelPath = (child, rootPath) => {
  let haveSolution = false;

  if (haveSolution) return;

  if (child.children?.length > 0) {
    for (let h of child.children) {
      const path = rootPath + "/" + h.link;

      if (path.search(route.path) !== -1) {
        router.push(path);
        haveSolution = true;
        return;
      }

      if (child.children.length > 0) {
        getRecursiveLevelPath(h, rootPath);
      }
    }
  }
};

onMounted(async () => {
  let foundMatch = false;
  const values = Object?.values(pagesData);

  for (let value of values) {
    const res = await value();
    let rootPath = res.path;

    if (rootPath.at(-1) === "/") {
      rootPath = rootPath.slice(0, -1);
    }

    if (res.headers?.length > 0) {
      for (let h of res.headers) {
        const path = rootPath + "/" + h.link;

        if (path.search(route.path) !== -1) {
          router.push(path);
          foundMatch = true;
          return;
        }
        getRecursiveLevelPath(h, rootPath);
      }
    }
  }

  // Uncomment this to redirect to the correct page
  // if (route.fullPath.startsWith('/legacy')) {
  //   const newPath = route.fullPath.replace('/legacy', '/cloudlinuxos');
  //   window.location.href = newPath;
  //   foundMatch = true;
  // } else if (route.fullPath.startsWith('/shared')) {
  //   const newPath = route.fullPath.replace('/shared', '/cloudlinuxos');
  //   router.push(newPath);
  //   window.location.href = newPath;
  //   foundMatch = true;
  // }
  
  // If no match is found, update the URL to show just 404.html
  if (!foundMatch) {
    // Get the base URL (protocol + hostname + port)
    const baseUrl = window.location.origin;
    
    // Determine if there's a base path in the Vue application
    // This assumes your Vue router base is available - if not, you might need another approach
    const basePath = router.options.base || '/';
    
    // Create the complete 404.html URL
    const new404Url = baseUrl + (basePath.endsWith('/') ? basePath : basePath + '/') + '404.html';
    
    // Use history.replaceState to update the URL without navigation
    window.history.replaceState(
      { ...history.state },
      '404 - Page Not Found',
      new404Url
    );
  }
});
</script>

<style>
:root {
  --primary-color: #43a069;
  --primary-hover: #3a8f5b;
  --secondary-color: #f3f6f3;
  --text-color: #314659;
  --text-light: #676767;
  --border-color: #e8e8e8;
  --border-radius: 8px;
  --shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  --transition: all 0.3s ease;
}

.custom-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 40px 20px;
  box-sizing: border-box;
  background-color: var(--secondary-color);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.not-found-content {
  max-width: 1000px;
  width: 100%;
}

.error-header {
  text-align: center;
  margin-bottom: 60px;
  padding: 30px;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
}

.error-code {
  font-size: 8rem;
  font-weight: 700;
  color: var(--primary-color);
  line-height: 1;
  margin-bottom: 10px;
  background: linear-gradient(135deg, var(--primary-color), #698463);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.error-header h1 {
  font-size: 2.5rem;
  color: var(--text-color);
  margin: 0 0 15px;
  font-weight: 600;
}

.error-message {
  font-size: 1.1rem;
  color: var(--text-light);
  margin: 0 0 30px;
}

.primary-button {
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: 0 2px 10px rgba(67, 160, 105, 0.2);
}

.primary-button:hover {
  background-color: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(67, 160, 105, 0.3);
}

.button-icon {
  margin-right: 8px;
  font-weight: bold;
}

.button-arrow {
  margin-left: 8px;
  transition: transform 0.2s ease;
}

.documents-section {
  margin-top: 20px;
  width: 100%;
}

.documents-section h2 {
  text-align: center;
  font-size: 1.8rem;
  color: var(--text-color);
  margin-bottom: 30px;
  font-weight: 600;
}

.documents-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: var(--border-radius);
  background-color: white;
  box-shadow: var(--shadow);
  transition: var(--transition);
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  border-color: rgba(67, 160, 105, 0.3);
}

.card-content {
  padding: 25px;
  flex-grow: 1;
}

.card h3 {
  margin: 0 0 15px;
  font-size: 1.3rem;
  color: var(--primary-color);
  font-weight: 600;
  line-height: 1.3;
}

.card p {
  margin: 0;
  font-size: 1rem;
  color: var(--text-light);
  line-height: 1.5;
}

.card-footer {
  padding: 15px 25px 25px;
  display: flex;
  justify-content: flex-start;
}

.card-button {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #f2f5f2;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  border-radius: var(--border-radius);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.card-button:hover {
  background-color: var(--primary-color);
  color: white;
}

.card-button:hover .button-arrow {
  transform: translateX(4px);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .error-code {
    font-size: 6rem;
  }
  
  .error-header h1 {
    font-size: 2rem;
  }
  
  .documents-cards {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 480px) {
  .error-code {
    font-size: 4.5rem;
  }
  
  .error-header h1 {
    font-size: 1.75rem;
  }
  
  .error-message {
    font-size: 1rem;
  }
  
  .documents-cards {
    grid-template-columns: 1fr;
  }
}
</style>
