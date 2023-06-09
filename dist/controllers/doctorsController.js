var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import doctorService from "../services/doctorService.js";
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name, email, password, specialty, city, state, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, name = _a.name, email = _a.email, password = _a.password, specialty = _a.specialty, city = _a.city, state = _a.state;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, doctorService.create(name, email, password, specialty, city, state)];
                case 2:
                    _b.sent();
                    res.sendStatus(201);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    next(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function signin(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, token, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, doctorService.signin(email, password)];
                case 2:
                    token = _b.sent();
                    res.send({ token: token });
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _b.sent();
                    next(err_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function findDoctorsBySpecialty(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var specialty, doctors, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    specialty = req.body.specialty;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, doctorService.findDoctorBySpecialty(specialty)];
                case 2:
                    doctors = _a.sent();
                    res.send({ doctors: doctors });
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    next(err_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function findDoctorsByCity(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var city, doctors, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    city = req.body.city;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, doctorService.findDoctorByCity(city)];
                case 2:
                    doctors = _a.sent();
                    res.send({ doctors: doctors });
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _a.sent();
                    next(err_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function findDoctorsByState(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var state, doctors, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    state = req.body.state;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, doctorService.findDoctorByState(state)];
                case 2:
                    doctors = _a.sent();
                    res.send({ doctors: doctors });
                    return [3 /*break*/, 4];
                case 3:
                    err_5 = _a.sent();
                    next(err_5);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function findDoctorsByName(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var name, doctors, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = req.body.name;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, doctorService.findDoctorByName(name)];
                case 2:
                    doctors = _a.sent();
                    res.send({ doctors: doctors });
                    return [3 /*break*/, 4];
                case 3:
                    err_6 = _a.sent();
                    next(err_6);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getSchedule(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, id, date, schedule, err_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, id = _a.id, date = _a.date;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, doctorService.getSchedule(id, date)];
                case 2:
                    schedule = _b.sent();
                    res.send({ schedule: schedule });
                    return [3 /*break*/, 4];
                case 3:
                    err_7 = _b.sent();
                    next(err_7);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
export default {
    create: create,
    signin: signin,
    findDoctorsBySpecialty: findDoctorsBySpecialty,
    findDoctorsByCity: findDoctorsByCity,
    findDoctorsByState: findDoctorsByState,
    findDoctorsByName: findDoctorsByName,
    getSchedule: getSchedule,
};
