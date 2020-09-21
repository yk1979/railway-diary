import { convert } from "@agreed/typed";

import { api as indexDiaries } from "./diaries/indexDiaries";

module.exports = convert(...[indexDiaries]);
