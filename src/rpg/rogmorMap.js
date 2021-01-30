// y * 1000 + x
export const dryLand = [8007,8008,8009,8010,7010,6010,5010,4010,3010,3009,2009,1009,1010,1011,1012,1013,1014,2014,2013,2012,2011,2010,3011,3012,3013,3014,3015,4011,4012,4013,5013,5014,4014,4015,4016,4017,3017,3018,4018,4019,5019,6019,7019,8019,9019,9018,9017,9016,10016,11016,11015,11014,11013,12014,12015,10015,10014,9014,9015,10017,11017,8018,8017,7017,7018,6018,5018,5017,5016,5015,6015,6016,6017,7016,7015,7014,7013,7012,7011,6011,5011,5012,6012,6013,6014,8015,8014,8013,8012,8011,9011,9012,10011,10010,10009,9009,9010,9008,9007,9006,10008,10007,11007,12007,13007,13008,12006,13006,13005,13004,12004,12003,11003,11002,10002,9002,9001,8001,7001,7000,6001,6002,5002,4002,3002,3001,2001,1001,1002,2002,3003,2003,2004,3004,4004,5004,5003,4003,6003,6004,7004,7005,6005,8005,9005,9004,10004,11004,11005,11006,12005,10005,10006,10003,9003,8003,7003,7002,8002,8004,8006,7006,7007,7008,7009,6009,5009,5008,6008,6007,5007,5006,4006,4007,4008,3006,2006,2007,10013,12013,12012,12011,13011,13012,13010,12010,12009];
export const toCoord = ({x, y}) => y * 1000 + x;
export const abToCoord = (a, b) => b * 1000 + a;
export const coordTo = coord => ({x: coord % 1000 , y: coord / 1000 | 0 }); 