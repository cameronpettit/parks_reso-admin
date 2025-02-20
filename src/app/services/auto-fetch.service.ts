import { Injectable } from '@angular/core';
import { Constants } from '../shared/utils/constants';
import { LoggerService } from './logger.service';
import { ParkService } from './park.service';

@Injectable({
  providedIn: 'root',
})
export class AutoFetchService {
  // TODO: This should come in from the config service.
  public timeIntevalSeconds = 60 * 60;
  public fetchQueue = [Constants.dataIds.PARKS_LIST];

  constructor(private parkService: ParkService, private loggerService: LoggerService) {}

  async run() {
    this.runFetches(this.fetchQueue);
    setInterval(() => {
      this.loggerService.debug(`RunFetches ${JSON.stringify(this.fetchQueue)}`);
      this.runFetches(this.fetchQueue);
    }, this.timeIntevalSeconds * 1000);
  }
  runFetches(fetchQueue) {
    for (let i = 0; i < fetchQueue.length; i++) {
      const fetchId = fetchQueue[i];
      if (fetchId === Constants.dataIds.PARKS_LIST) {
        this.parkService.fetchData();
      }
    }
  }
}
