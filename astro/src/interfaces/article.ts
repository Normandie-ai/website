export default interface Article {
    id: number;
    title: string;
    description: string;
    image: {
      url: string;
    };
    content: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }