/* tslint:disable */
/* eslint-disable */
/**
 * RC中国-爱宠有卡
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * 
 * @export
 * @interface ConsumerAccount
 */
export interface ConsumerAccount {
    openId?: string;
    unionId?: string;
    memberId?: string;
    userType: string;
    followStatus: ConsumerAccountFollowStatusEnum;
    fllowedTime: Date;
    unfllowedTime: Date;
}

/**
* @export
* @enum {string}
*/
export enum ConsumerAccountFollowStatusEnum {
    Followed = 'Followed',
    Unfollowed = 'Unfollowed'
}


