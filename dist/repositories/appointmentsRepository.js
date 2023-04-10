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
import { connectionDb } from "../config/database.js";
function createAppointment(id, doctor_id, date, hour) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectionDb.query("\n        INSERT INTO \"public.appointments\" (patient_id, doctor_id, date, time)\n        VALUES ($1, $2, $3, $4)\n    ", [id, doctor_id, date, hour])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function findAppointmentsByDate(doctor_id, date, time) {
    return __awaiter(this, void 0, void 0, function () {
        var times, startTime, endTime, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    times = new Date("".concat(date, "T").concat(time));
                    startTime = new Date(times.getTime() - 29 * 60000);
                    endTime = new Date(times.getTime() + 29 * 60000);
                    return [4 /*yield*/, connectionDb.query("SELECT \"public.appointments\".id, \"public.doctors\".name AS doctor_name, \"public.patients\".name AS patient_name, \"public.doctors\".specialty, \"public.appointments\".date, \"public.appointments\".canceled,\n        \"public.appointments\".finished \n        FROM \"public.appointments\"\n        JOIN \"public.doctors\" ON \"public.appointments\".doctor_id = \"public.doctors\".id\n        JOIN \"public.patients\" ON \"public.appointments\".patient_id = \"public.patients\".id\n        WHERE doctor_id = $1 \n        AND date = $2 \n        AND time >= $3 \n        AND time <= $4\n        AND canceled = false;", [
                            doctor_id,
                            date,
                            startTime.toLocaleTimeString(),
                            endTime.toLocaleTimeString(),
                        ])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function findAppointmentsById(appointment_id, id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectionDb.query("SELECT \"public.appointments\".id, \"public.doctors\".name AS doctor_name, \"public.patients\".name AS patient_name, \"public.doctors\".specialty, \"public.appointments\".date, \"public.appointments\".canceled,\n        \"public.appointments\".finished\n        FROM \"public.appointments\"\n        JOIN \"public.doctors\" ON \"public.appointments\".doctor_id = \"public.doctors\".id\n        JOIN \"public.patients\" ON \"public.appointments\".patient_id = \"public.patients\".id\n        WHERE \"public.appointments\".id = $1\n        AND \"public.appointments\".doctor_id = $2 ", [appointment_id, id])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function findAppointmentsByDoctorId(id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectionDb.query("SELECT \"public.appointments\".id, \"public.doctors\".name AS doctor_name, \"public.patients\".name AS patient_name,\n        \"public.doctors\".specialty, \"public.appointments\".date, \"public.appointments\".canceled,\n        \"public.appointments\".finished\n        FROM \"public.appointments\"\n        JOIN \"public.doctors\" ON \"public.appointments\".doctor_id = \"public.doctors\".id\n        JOIN \"public.patients\" ON \"public.appointments\".patient_id = \"public.patients\".id\n        WHERE \"public.doctors\".id = $1 ", [id])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function findAppointmentsByPatientId(id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectionDb.query("SELECT \"public.appointments\".id, \"public.doctors\".name AS doctor_name, \"public.patients\".name AS patient_name, \"public.doctors\".specialty, \"public.appointments\".date, \"public.appointments\".canceled\n        ,\"public.appointments\".finished\n        FROM \"public.appointments\"\n        JOIN \"public.doctors\" ON \"public.appointments\".doctor_id = \"public.doctors\".id\n        JOIN \"public.patients\" ON \"public.appointments\".patient_id = \"public.patients\".id\n        WHERE \"public.patients\".id = $1 ", [id])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function findAppointmentsFinishedByPatient(id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectionDb.query("SELECT \"public.appointments\".id, \"public.doctors\".name AS doctor_name, \"public.patients\".name AS patient_name, \"public.doctors\".specialty, \"public.appointments\".date, \"public.appointments\".canceled,\n        \"public.appointments\".finished\n        FROM \"public.appointments\"\n        JOIN \"public.doctors\" ON \"public.appointments\".doctor_id = \"public.doctors\".id\n        JOIN \"public.patients\" ON \"public.appointments\".patient_id = \"public.patients\".id\n        WHERE \"public.patients\".id = $1 \n        AND \"public.appointments\".finished = true", [id])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function findAppointmentsFinishedByDoctor(id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectionDb.query("SELECT \"public.appointments\".id, \"public.doctors\".name AS doctor_name, \"public.patients\".name AS patient_name, \"public.doctors\".specialty, \"public.appointments\".date, \n        \"public.appointments\".canceled, \"public.appointments\".finished\n        FROM \"public.appointments\"\n        JOIN \"public.doctors\" ON \"public.appointments\".doctor_id = \"public.doctors\".id\n        JOIN \"public.patients\" ON \"public.appointments\".patient_id = \"public.patients\".id\n        WHERE \"public.doctors\".id = $1 \n        AND \"public.appointments\".finished = true", [id])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function cancelAppointment(appointment_id, id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectionDb.query("\n    UPDATE \"public.appointments\"\n    SET canceled = true WHERE \"public.appointments\".id = $1\n    AND \"public.appointments\".doctor_id = $2;\n    ", [appointment_id, id])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function finishAppointment(appointment_id, id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectionDb.query("\n  UPDATE \"public.appointments\"\n  SET finished = true WHERE \"public.appointments\".id = $1\n  AND \"public.appointments\".doctor_id = $2;\n  ", [appointment_id, id])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
export default {
    createAppointment: createAppointment,
    findAppointmentsByDate: findAppointmentsByDate,
    cancelAppointment: cancelAppointment,
    findAppointmentsById: findAppointmentsById,
    findAppointmentsByDoctorId: findAppointmentsByDoctorId,
    findAppointmentsByPatientId: findAppointmentsByPatientId,
    findAppointmentsFinishedByPatient: findAppointmentsFinishedByPatient,
    findAppointmentsFinishedByDoctor: findAppointmentsFinishedByDoctor,
    finishAppointment: finishAppointment,
};
