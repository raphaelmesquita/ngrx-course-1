import { Store } from "@ngrx/store";
import { Component, OnInit } from "@angular/core";
import * as _ from "lodash";

import { ThreadsService } from "../services/threads.service";
import { ApplicationState } from "../store/application-state";
import { LoadUserThreadsAction } from "../store/actions";
import { skip, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { ThreadSummaryVM } from "./thread-summary.vm";

import { userNameSelector } from "./userNameSelector";
import { unreadMessagesCounterSelector } from "./unreadMessagesCounterSelector";
import { threadSummariesSelector } from "./threadSummariesSelector";

@Component({
  selector: "thread-section",
  templateUrl: "./thread-section.component.html",
  styleUrls: ["./thread-section.component.css"]
})
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>;

  constructor(private threadsService: ThreadsService, private store: Store<ApplicationState>) {
    this.userName$ = store.select(userNameSelector);
    this.unreadMessagesCounter$ = store.select(unreadMessagesCounterSelector);
    this.threadSummaries$ = store.select(threadSummariesSelector);
  }

  ngOnInit() {
    this.threadsService.loadUserThreads().subscribe(
      x => this.store.dispatch(new LoadUserThreadsAction(x))
    );
  }

}
