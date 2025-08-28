const date = require("date-and-time");
module.exports = {
timing (data){
    var f= '';
    var t = '';
    const l = new Date;
           date.format(data, "YYYY/MM/DD HH:mm:ss");
			let a = date.subtract(l, data).toSeconds();
    if (a < 60) var p = {
				t: a,
				f: "Sec"
			};
			else {
				let t = date.subtract(l, data).toMinutes();
				if (t < 60) p = {
					t: t,
					f: "Min"
				};
				else {
					let t = date.subtract(l, data).toHours();
					if (t < 24) p = {
						t: t,
						f: "Hr"
					};
					else {
						let t = date.subtract(l, data).toDays();
						if (t < 7) p = {
							t: t,
							f: "D"
						};
						else {
							let e = t / 7;
							p = {
								t: e,
								f: "W"
							};
							if (e > 4) {
								let t = e / 4;
								p = {
									t: t,
									f: "M"
								};
								if (t > 12) {
									p = {
										t: t / 12,
										f: "Y"
									}
								}
							}
						}
					}
				}
			}
			
            return {'t' : Math.round(p.t), 'f' : p.f};
}
}