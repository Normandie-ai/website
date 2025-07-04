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
        const repository = process.env.GITHUB_REPOSITORY || 'normandie-ai/normandie-ai.github.io';
        
        if (!githubToken) {
          strapi.log.error('GITHUB_TOKEN not configured');
          return;
        }

        const response = await fetch(`https://api.github.com/repos/${repository}/dispatches`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event_type: 'strapi-content-update'
          }),
        });

        if (response.ok) {
          strapi.log.info('🚀 GitHub Pages deployment triggered successfully');
        } else {
          strapi.log.error('❌ Failed to trigger deployment:', await response.text());
        }
      } catch (error) {
        strapi.log.error('❌ Error triggering deployment:', error);
      }
    }

    // Automatically trigger deployment when content is published
    strapi.db.lifecycles.subscribe({
      models: ['api::page.page', 'api::member.member'],
      
      async afterUpdate(event) {
        const { result } = event;
        
        // Trigger deployment when content is published
        if (result.publishedAt) {
          await triggerGitHubDeploy();
        }
      },
      
      async afterCreate(event) {
        const { result } = event;
        
        // Trigger deployment when new content is created and published
        if (result.publishedAt) {
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
