const a = "Md Faizan Hassan";
const ch = "-";

const res = a.replace(/ /g, ch);

console.log(res);

// app.use(express.static());

// console.log(path.join(__dirname, "../uploads/actual-size"));
const actual_size = path.join(__dirname, "../uploads/image/actual-size");
const resized = path.join(__dirname, "../uploads/image/resized");
const thumb_size = path.join(__dirname, "../uploads/image/thumb-size");

// app.use("actual_size", express.static(actual_size));

// app.use(express.static(actual_size));
// app.use(express.static(resized));
// app.use(express.static(thumb_size));
