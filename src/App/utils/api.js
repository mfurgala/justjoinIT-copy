export let API_HOST = "http://159.69.14.12:7000";
if (process.env.NODE_ENV === "test") {
  API_HOST = "http://159.69.14.12";
}
