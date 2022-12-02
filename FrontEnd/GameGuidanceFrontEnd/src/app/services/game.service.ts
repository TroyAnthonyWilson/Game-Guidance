import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, toArray } from 'rxjs';
import { GameMode } from '../interfaces/gameMode';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  gameModesURL: string = 'https://api.igdb.com/v4/game_modes'
  backendURL: string = 'https://localhost:7117/api';
  gameModes: GameMode[] = [];
  gameModeNames: string[] = this.gameModes.map((gm) => gm.name)
  constructor(private httpClient: HttpClient) { }
  loadGameModes = (): void => {
    this.postGameModes().subscribe((data: GameMode[]) => this.gameModes = data);
  }
  postGameModes = (): Observable<GameMode[]> => {
    return this.httpClient.post<GameMode[]>(this.backendURL, this.gameModes)}
  }

