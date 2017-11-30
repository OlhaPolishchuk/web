var useLocalStorage = true;

var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
IDBTransaction  = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;

var request = indexedDB.open('db', 3);

request.onerror = function (e) {
      console.log('error');
};

request.onsuccess = function(e){
      useLocalStorage = false;
          db = e.target.result;
 };

 request.onupgradeneeded = function(e){
     var db = e.target.result;
     var news = db.createObjectStore("news", {autoIncrement: true});
     var reviews = db.createObjectStore("feedback", {autoIncrement: true});
 }; 
