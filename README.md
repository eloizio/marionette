# AC Academy: Marionette Class

This is a Marionette.js implementation for AC Social app.

### Observations

1. I didn't understand why action buttons were not being shown in friends page. During debug, ui element was there, but **hide** class wasn't removed as it should, like in home page.
2. I could not be able to make **modelEvents** and **collectionEvents** works in any views, but loginFormView.js
3. With user abc@abc.com the friendship service it's crashing the api.

### Installation
After cloning this repo, follow this steps inside the repo-folder:

```sh
npm install
```

```sh
bower install
```

```sh
http-server
```

In your favorite browser access:
```sh
http://127.0.0.1:8080/<folder_name>/src/
```

After login, use the topbar to navigate!


Thanks for your time.