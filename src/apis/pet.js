"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype,
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPetData = void 0;
var axios_1 = require("axios");
var dotenv = require("dotenv");
var supabase_js_1 = require("@supabase/supabase-js");
dotenv.config();
// export const fetchAPI = async () => {
//   const serviceKey = import.meta.env.VITE_API_SERVICE_KEY;
//   if (!serviceKey) {
//     throw new Error("서비스 키가 설정되지 않았습니다. 환경 변수를 확인하세요.");
//   }
//   try {
//     const { data } = await axios.get(
//       "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/sigungu",
//       {
//         params: {
//           serviceKey,
//           upr_cd: 6500000,
//           _type: "json",
//         },
//       },
//     );
//     const type = data.response.body.items.item;
//     console.log(type);
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       if (error.response.status === 429) {
//         console.log("트래픽 초과. 잠시 후 다시 시도해주세요.");
//       } else {
//         console.error(
//           "API 요청 오류:",
//           error.response.status,
//           error.response.statusText,
//         );
//       }
//     } else {
//       console.error("알 수 없는 오류:", error);
//     }
//     throw error;
//   }
// };
var supabaseUrl = process.env.VITE_SUPABASE_URL;
var supabaseKey = process.env.VITE_SERVICE_ROLE;
var supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
var fetchPetData = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var serviceKey, data, pets_1, savePetsToDB, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          serviceKey = process.env.VITE_API_SERVICE_KEY;
          if (!serviceKey) {
            throw new Error(
              "서비스 키가 설정되지 않았습니다. 환경 변수를 확인하세요.",
            );
          }
          _a.label = 1;
        case 1:
          _a.trys.push([1, 4, , 5]);
          return [
            4 /*yield*/,
            axios_1.default.get(
              "http://apis.data.go.kr/1543061/abandonmentPublicService_v2/abandonmentPublic_v2",
              {
                params: {
                  serviceKey: serviceKey,
                  numOfRows: 1000,
                  _type: "json",
                },
              },
            ),
          ];
        case 2:
          data = _a.sent().data;
          pets_1 = data.response.body.items.item;
          savePetsToDB = function () {
            return __awaiter(void 0, void 0, void 0, function () {
              var currentYear,
                deleteError,
                _i,
                pets_2,
                pet,
                kindCd,
                type,
                kind,
                ageMatch,
                ageYear,
                calculatedAge,
                weightMatch,
                calculatedWeight,
                error;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    currentYear = new Date().getFullYear();
                    return [4 /*yield*/, supabase.rpc("truncate_list")];
                  case 1:
                    deleteError = _a.sent().error;
                    if (deleteError) {
                      console.error(
                        "기존 데이터 삭제 오류:",
                        deleteError.message,
                      );
                      return [2 /*return*/];
                    }
                    (_i = 0), (pets_2 = pets_1);
                    _a.label = 2;
                  case 2:
                    if (!(_i < pets_2.length)) return [3 /*break*/, 5];
                    pet = pets_2[_i];
                    kindCd = pet.kindCd;
                    type = kindCd.includes("개")
                      ? "강아지"
                      : kindCd.includes("고양이")
                        ? "고양이"
                        : "기타";
                    kind = kindCd.replace(/\[.*?\]\s*/, "").trim();
                    ageMatch = pet.age.match(/^(\d{4})/);
                    ageYear = ageMatch ? parseInt(ageMatch[1], 10) : null;
                    calculatedAge = ageYear ? currentYear - ageYear : null;
                    weightMatch = pet.weight.match(/^([\d.]+)/);
                    calculatedWeight = weightMatch
                      ? parseFloat(weightMatch[1])
                      : null;
                    return [
                      4 /*yield*/,
                      supabase.from("list").insert([
                        {
                          desertion_no: pet.desertionNo,
                          filename: pet.filename,
                          happen_dt: pet.happenDt,
                          happen_place: pet.happenPlace,
                          kind_cd: pet.kindCd,
                          color_cd: pet.colorCd,
                          age: pet.age,
                          weight: pet.weight,
                          notice_no: pet.noticeNo,
                          notice_sdt: pet.noticeSdt,
                          notice_edt: pet.noticeEdt,
                          popfile: pet.popfile1,
                          process_state: pet.processState,
                          sex_cd: pet.sexCd,
                          neuter_yn: pet.neuterYn,
                          special_mark: pet.specialMark,
                          care_nm: pet.careNm,
                          care_tel: pet.careTel,
                          care_addr: pet.careAddr,
                          org_nm: pet.orgNm,
                          charge_nm: pet.chargeNm,
                          officetel: pet.officetel,
                          notice_comment: pet.noticeComment,
                          type: type,
                          kind: kind,
                          calculated_age: calculatedAge,
                          calculated_weight: calculatedWeight,
                        },
                      ]),
                    ];
                  case 3:
                    error = _a.sent().error;
                    if (error) {
                      console.error(
                        "Supabase 데이터 삽입 오류:",
                        error.message,
                      );
                    }
                    _a.label = 4;
                  case 4:
                    _i++;
                    return [3 /*break*/, 2];
                  case 5:
                    return [2 /*return*/];
                }
              });
            });
          };
          return [4 /*yield*/, savePetsToDB()];
        case 3:
          _a.sent();
          return [2 /*return*/, pets_1];
        case 4:
          error_1 = _a.sent();
          if (axios_1.default.isAxiosError(error_1) && error_1.response) {
            if (error_1.response.status === 429) {
              console.log("트래픽 초과. 잠시 후 다시 시도해주세요.");
            } else {
              console.error(
                "API 요청 오류:",
                error_1.response.status,
                error_1.response.statusText,
              );
            }
          } else {
            console.error("알 수 없는 오류:", error_1);
          }
          throw error_1;
        case 5:
          return [2 /*return*/];
      }
    });
  });
};
exports.fetchPetData = fetchPetData;
