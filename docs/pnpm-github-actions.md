# Using pnpm in GitHub Actions Workflows

When using `pnpm` for dependency management in your GitHub Actions workflows, you might encounter issues where `pnpm` is not found, leading to errors like "Unable to locate executable file: pnpm". This typically happens because `actions/setup-node` does not automatically install `pnpm` globally.

To resolve this, you need to explicitly install `pnpm` as a step in your workflow, after setting up Node.js.

## Example Workflow Configuration

Here's how you can modify your `.github/workflows/deploy.yml` (or any other workflow file) to correctly set up and use `pnpm`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
    - uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'pnpm' # Specify 'pnpm' here for caching dependencies
        cache-dependency-path: pnpm-lock.yaml # Point to your pnpm lock file

    # --- Start of pnpm specific steps ---
    - name: Install pnpm
      # This step explicitly installs pnpm globally on the runner.
      run: npm install -g pnpm

    - name: Cache pnpm modules
      # Cache pnpm modules to speed up subsequent workflow runs.
      uses: actions/cache@v4
      with:
        path: |
          node_modules
          ~/.pnpm-store # pnpm's global content-addressable store
        key: ${{ runner.os }}-pnpm-modules-${{ hashFiles('pnpm-lock.yaml') }}
        restore-keys: |
          ${{ runner.os }}-pnpm-modules-
    # --- End of pnpm specific steps ---

    - name: Install dependencies
      # Use pnpm to install project dependencies.
      run: pnpm install --prefer-offline --no-audit

    - name: Build
      run: npm run build
      env:
        VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
        VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}

    - name: Setup Pages
      uses: actions/configure-pages@v4

    - name: Upload artifact
      uses: actions/upload-pages-artifact@v3
      with:
        path: ./dist

    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v4
```

### Key Changes Explained:

1.  **`Install pnpm` step**:
    ```yaml
    - name: Install pnpm
      run: npm install -g pnpm
    ```
    This step ensures that `pnpm` is available on the GitHub Actions runner. `npm` is available by default when `setup-node` is used, so we can use it to install `pnpm`.

2.  **`Cache pnpm modules` step**:
    *   **`path: | node_modules ~/.pnpm-store`**: Besides `node_modules`, it's recommended to cache `~/.pnpm-store` as `pnpm` uses a content-addressable store. This significantly speeds up `pnpm install` in subsequent runs.
    *   **`key` and `restore-keys`**: These are updated to reflect `pnpm` and `pnpm-lock.yaml` for correct cache invalidation and restoration.

By including these steps, your GitHub Actions workflow will correctly identify and utilize `pnpm` for managing your project's dependencies.