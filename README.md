# Product Catalog (Backend)

[DEMO LINK](https://frontend-product-catalog.vercel.app/)

[API](https://backend-product-catalog.onrender.com/)

Welcome to the Nice Gadgets Apple Store API! This API provides access to a comprehensive catalog of products, including details, categories, colors, capacities, and more. Whether you're building a web or mobile application, this API allows you to retrieve product information for a seamless user experience.

## Database Tables (ERD)

![Product Catalog ER](https://github.com/ruslanpashkov/product_catalog_backend/assets/129327901/76dc79fe-5e92-4953-b96f-5ff1c8f13124)

## Technologies Used

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [React Context](https://reactjs.org/docs/context.html)
- [React Router](https://reactrouter.com/)
- [Sass (SCSS)](https://sass-lang.com/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Sequelize](https://sequelize.org/)
- [SWC](https://swc.rs/)
- [Vite](https://vitejs.dev/)
- [Swiper](https://swiperjs.com/)

## Endpoints

### Get Products by Category

Retrieve a list of products based on a specific category.

**Endpoint:** `/products`

**Method:** GET

### Get Product by Device ID

Retrieve detailed information about a specific product using its device ID.

**Endpoint:** `/products/:deviceId`

**Method:** GET

### Get Total Product Count

Retrieve the total count of products in the catalog.

**Endpoint:** `/products/count`

**Method:** GET

### Get New Products

Retrieve a list of new products.

**Endpoint:** `/products/new`

**Method:** GET

### Get Discounted Products

Retrieve a list of products on discount.

**Endpoint:** `/products/discount`

**Method:** GET

### Get Recommended Products

Retrieve a list of recommended products.

**Endpoint:** `/products/recommended`

**Method:** GET

### Search Products

Search for products based on a query string.

**Endpoint:** `/products/search`

**Method:** GET

## Usage

1. Clone this repository to your local environment.
2. Install the required dependencies using `npm install` or `yarn install`.
3. Set up your PostgreSQL database and configure the connection in `config/config.cjs`.
4. Run the server using `npm start` or `yarn start`.
5. Access the API endpoints using your preferred HTTP client (e.g., Postman, Insomnia) or integrate them into your frontend application.

## License

The Nice Gadgets Apple Store is open-source and available under the [GNU GENERAL PUBLIC LICENSE](LICENSE).
