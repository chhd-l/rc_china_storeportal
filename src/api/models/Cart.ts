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

import {
    Consumer,
} from './';

/**
 * 
 * @export
 * @interface Cart
 */
export interface Cart {
    cartId: string;
    consumerId: Consumer;
    storeId: string;
    createdAt: string;
    lastModifiedAt: string;
    goodsId: string;
    goodsInfoId: string;
    goodsNum: string;
    petsId: string;
    petsType: string;
}


