export default ({ env }) => ({
  'update-static-content': {
    enabled: true,
    config: {
      JWT_SECRET: env('JWT_SECRET'),
    },
  },
});