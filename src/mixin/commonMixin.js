import moment from "moment";

/**
 *  公共的基础的枚举类型的字典
 *  
 *  操作类型：修改
 *  注意：这里的 key 使用 label 或者 labell 都能被解析出来，默认采用服务端给的 label
 */
export default {
	label: 'Common-mixin',
	data() {
		return {
			/**
			 * 支付类型：支付方式：1微信主扫 2微信被扫 3支付宝主扫 4支付被扫 5银联主扫 6银联被扫 7刷卡
			 */
				common_pay_appType: [
				{
					value: 1,
					label: '微信主扫',
				},
				{
					value: 2,
					label: '微信被扫',
				},
				{
					value: 3,
					label: '支付宝主扫',
				},
				{
					value: 4,
					label: '支付被扫 ',
				},
				{
					value: 5,
					label: '支付被扫 ',
				},
				{
					value: 6,
					label: '银联被扫 ',
				},
				{
					value: 7,
					label: '刷卡 ',
				},
			],
				/**
			 * 交易状态, 订单状态：2交易中 1交易成功0 交易失败 4交易冲正失败 3交易已冲正
			 */
				 common_pay_status: [
					{
						value: 0,
						label: '交易失败',
					},
					{
						value: 1,
						label: '交易成功',
					},
					{
						value: 2,
						label: '交易中',
					},
					{
						value: 3,
						label: '交易已冲正',
					},
					{
						value: 4,
						label: '交易冲正失败',
					},
				],
			/**
			 * 消费业务 1 消费类,2 会员缴费,3 押金,4 首刷,5 流量卡
			 */
			 common_pay_bizType: [
				{
					value: 1,
					label: '消费类',
				},
				{
					value: 2,
					label: '会员缴费',
				},
				{
					value: 3,
					label: '押金',
				},
				{
					value: 4,
					label: '首刷 ',
				},
				{
					value: 5,
					label: '流量卡 ',
				},
			],
			/**
			 * 结算周期：贷记卡自动结算：S0,借记卡结算：T1
			 */
			 common_settlePeriod: [
				{
					value: 'S0',
					label: '贷记卡自动结算',
				},
				{
					value: 'T1',
					label: '借记卡结算',
				},
				{
					value: '',
					label: '',
				},
			],
			/**
			 * 刷卡方式：1刷卡2插卡3挥卡4双免5手机支付（现在是对应海科）
			 */
			 common_entryMode: [
				{
					value: 1,
					label: '刷卡',
				},
				{
					value: 2,
					label: '插卡',
				},
				{
					value: 3,
					label: '挥卡',
				},
				{
					value: 4,
					label: '双免',
				},
				{
					value: 5,
					label: '手机支付',
				},
			],
			/**
			 * 结算状态：2结算中1结算成功0结算失败，3, "待结算"，4, "结算冻结"
			 */
			 common_settleStatus: [
				{
					value: 0,
					label: '结算失败',
				},
				{
					value: 1,
					label: '结算成功',
				},
				{
					value: 2,
					label: '结算中',
				},
				{
					value: 3,
					label: '待结算',
				},
				{
					value: 4,
					label: '结算冻结',
				}
			],
			/**
			 * 会员周期1.终身会员，2.年会员，3.季会员，4.月会员，5.周会员
			 */
			 common_memberValidityType: [
				{
					value: 1,
					label: '终身会员',
				},
				{
					value: 2,
					label: '年会员',
				},
				{
					value: 3,
					label: '季会员',
				},
				{
					value: 4,
					label: '月会员',
				},
				{
					value: 4,
					label: '周会员',
				}
			],
			/**
			 * 阶段性押金状态；,1未达标；2已达标；3已提现
			 */
			 common_mchtStatus: [
				{
					value: 1,
					label: '未达标',
				},
				{
					value: 2,
					label: '已达标',
				},
				{
					value: 3,
					label: '已提现',
				}
			],
			/**
			* 提现状态（1.提现中，2提现成功，3提现失败）
			*/
			common_WithdrawalSettleStatus: [
			 {
				 value: 1,
				 label: '提现中',
			 },
			 {
				 value: 2,
				 label: '提现成功',
			 },
			 {
				 value: 3,
				 label: '提现失败',
			 }
		 ],
		};
	},
	methods: {
		/**
		* @description -  根据字典匹配数据返回内容
		* @param {String} [dict]    - 数据对象
		* @param {String} [value]    - 数据值
		* @return void
		**/
		 getDict(dict,value){
			if(value===null || value===undefined) return;
			const name = this[dict].filter(i => i.value == value)[0].label
			return name;
		},
		/**
		* @description -  初始化时间格式
		* @return void
		**/
		toTime(date){
			return moment(new Date(date)).format("YYYY-MM-DD")
		},
		/**
		* @description -  z
		* @param {String} [str]    - 原字符串
		* @param {String} [frontLen]    - 前面截取
		* @param {String} [endLen]    - 结束截取
		* @param {String} [cha]    - 替换的字符串
		* @return void
		**/
		plusXing(str, frontLen, endLen, cha) {
			let len = str.length - frontLen - endLen;
			let xing = "";
				for (let i = 0; i < len; i++) {
						xing += cha;
				}
				return (
						str.substring(0, frontLen) + xing + str.substring(str.length - endLen)
				);
		},
	}
};