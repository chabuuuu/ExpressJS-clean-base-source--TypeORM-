# EXpressJS Base Source Apply DI With Inversify - Using Repository Pattern with TypeORM

- Flow: Controller --> Service --> Repository --> TypeORM Entity

- We combine all dependency in "container", then resolve and export the controller to use in routes

ORM: TypeORM

## Usage

### Development:
```
npm run start:dev
```

### Production:
```
npm run build
npm run start:prod
```

## Migration:
### Auto genrate migration file to /src/database/migration
```
npm run migration:generate
```

### Apply migration
```
npm run migration:start
```

## Architecture
![alt text](https://res.cloudinary.com/practicaldev/image/fetch/s--CDARQ4Hj--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/of739v9cu7namgc9m2am.jpg)


## How to create new API Endpoint:
- 1. Create new Entity Class in src/models
- 2. Create new repository and its repository interface in src/repository
- 3. Create new service and its service interface in src/service
- 4. Create new controller and its controller interface in src/controller
- 5. Combine all to container in src/container
- 6. Create new route in src/route


## Author
chabuuuu# ExpressJS-clean-base-source--TypeORM-
