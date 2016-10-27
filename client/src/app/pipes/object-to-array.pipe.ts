import {Pipe, PipeTransform} from '@angular/core';

/**
 * Print Object in View
 * Example:
 * <div *ngFor='elm of obj | objecttoarray:"key":true'></div>
 */
@Pipe({ name: 'objecttoarray' })
export class ObjectToArrayPipe implements PipeTransform {
    transform(value: Object, keyName: string, isSort: boolean = false): Object[] {
        let keyArr: Array<any> = Object.keys(value),
            dataArr: Array<any> = [];
        keyArr.forEach((key: any) => {
            value[key][keyName] = key;
            dataArr.push(value[key])
        });
        if(isSort) {
            dataArr.sort((a: Object, b: Object): number => {
                return a[keyName] > b[keyName] ? 1 : -1;
            });
        }
        console.log(dataArr);
        return dataArr;
    }
}