# Repository to database laboratory - Universidad de Antioquia

Expressjs app connected to a NoSQL database (Mongo DB)

You need to change the db.url and db.db_name attributes in `config/mongoose.js to fit to your database config:
```
const db = {
  url: 'mongodb://localhost:27017/',
  db_name: 'authors',
};
```

To run the application, first at all, you need to install node libraries with ```npm install```, then you can run it with ```npm start``` or with ```npm run debug``` to follow changes in the code and recharge automatically.

Finally to test you can use a browser and go to ```localhost:3000/authors```. This endpoint will bring all the authors. You can create new authors with the HTTP verbe POST (I recommend you to use Postman to do that).Finally, you can also apply a filter by `pais`, for instance: ```?pais=Argentina```.  
