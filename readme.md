# Gymbeam case study

It's a simple application written in Express with TypeScript that includes a single endpoint designed for sorting items in a warehouse according to their distance from the source. This ensures the most optimal gathering of specified items from the warehouse.

## Prerequisites

- Typescript
- Node.js
- NPM

## Installation

1. Clone this repository:`git clone <this-repo>`
2. Go to project directory: `cd gymbeam_casestudy`
3. Install all required dependencies: `npm install`
4. Create a `.env` file in the project root with required environment variables:
```dotenv
PORT=3000
GYMBEAM_API_KEY=YOUR_API_KEY
```
### Running the application in development mode
To initiate the application in development mode, execute the following command:`npm run start`
### Building and running the application for production
1. Build the application:`npm run build`
2. Start the production server:`npm run prod` (On port `3000`, unless specified otherwise)

### Running tests
You can execute unit tests using the following command: `npm test`

## Use
Application will create a POST endpoint at `/api/warehouse/get-picking-order`, which expects a body in the following JSON format:
```json
{
	"products": [
		"product-2",
		"product-1",
		"product-4",
		"product-3"
	],
	"originPoint": {
		"x": 0,
		"y": 0,
		"z": 0
	}
}
```
The originPoint is not required. If not provided, the default value of `{x: 0, y: 0, z: 0}` will be used, as shown in the example above.
For effective testing, you can use the CURL command provided below:
```bash
curl --request POST \
  --url http://localhost:3000/api/warehouse/get-picking-order \
  --header 'Content-Type: application/json' \
  --data '{
	"products": [
		"product-2",
		"product-1",
		"product-4",
		"product-3"
	],
	"originPoint": {
		"x": 0,
		"y": 0,
		"z": 0
	}
}'
```
