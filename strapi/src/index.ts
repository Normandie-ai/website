// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    // Simple function to trigger GitHub Pages deployment
    async function triggerGitHubDeploy() {
      try {
        const githubToken = process.env.GITHUB_TOKEN;
        const repository = process.env.GITHUB_REPOSITORY;
        
        // Debug: Log configuration (without exposing full token)
        strapi.log.info('🔍 GitHub Deploy Config:', {
          hasToken: !!githubToken,
          tokenPreview: githubToken ? `${githubToken.substring(0, 4)}...` : 'NOT_SET',
          repository: repository
        });
        
        if (!githubToken) {
          strapi.log.error('❌ GITHUB_TOKEN not configured');
          return;
        }

        if (!repository) {
          strapi.log.error('❌ GITHUB_REPOSITORY not configured');
          return;
        }

        // Use workflow_dispatch instead of repository_dispatch
        // This works with Personal Access Tokens
        const url = `https://api.github.com/repos/${repository}/actions/workflows/deploy.yml/dispatches`;
        const payload = {
          ref: 'main',
          inputs: {
            branch: 'main' // Using the existing input from the workflow
          }
        };

        strapi.log.info('🚀 Triggering GitHub deployment via workflow_dispatch...', { url, payload });

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
            'User-Agent': 'Strapi-GitHub-Deploy'
          },
          body: JSON.stringify(payload),
        });

        const responseText = await response.text();
        
        strapi.log.info('📡 GitHub API Response:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          body: responseText
        });

        if (response.ok) {
          strapi.log.info('🚀 GitHub Pages deployment triggered successfully via workflow_dispatch');
        } else {
          strapi.log.error('❌ Failed to trigger deployment:', {
            status: response.status,
            statusText: response.statusText,
            body: responseText,
            url: url
          });
        }
      } catch (error) {
        strapi.log.error('❌ Error triggering deployment:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
      }
    }

    // Automatically trigger deployment when content is published
    strapi.db.lifecycles.subscribe({
      models: ['api::page.page', 'api::member.member'],
      
      async afterUpdate(event) {
        const { result } = event;
        
        // Trigger deployment when content is published
        if (result.publishedAt) {
          strapi.log.info('📝 Content updated and published, triggering deployment...');
          await triggerGitHubDeploy();
        }
      },
      
      async afterCreate(event) {
        const { result } = event;
        
        // Trigger deployment when new content is created and published
        if (result.publishedAt) {
          strapi.log.info('📝 New content created and published, triggering deployment...');
          await triggerGitHubDeploy();
        }
      },
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
