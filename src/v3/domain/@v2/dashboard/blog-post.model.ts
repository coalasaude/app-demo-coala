export class BlogPostModel {
  title: string
  image: string
  author: string
  authorImage: string
  authorBio: string
  url: string
  category: string

  constructor({ title, url, image, author, authorImage, authorBio, category }: BlogPostModel) {
    this.title = title
    this.image = image
    this.author = author
    this.authorImage = authorImage
    this.authorBio = authorBio
    this.url = url
    this.category = category
  }
}
