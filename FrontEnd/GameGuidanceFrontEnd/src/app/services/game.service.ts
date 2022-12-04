import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, toArray } from 'rxjs';
import { GameMode } from '../interfaces/gameMode';
import { Genre } from '../interfaces/genre';
import { PlayerPerspective } from '../interfaces/player-perspective';
import { Theme } from '../interfaces/theme';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  gameModesURL: string = 'https://api.igdb.com/v4/game_modes'
  baseURL: string = 'https://localhost:7117/api';
  gameModes: GameMode[] = [];
  genres: Genre[] = [];
  playerPerspectives: PlayerPerspective[] = [];
  themes: Theme[] = [];
  constructor(private httpClient: HttpClient) { }
  gameServicePackage = (): void => {
    this.loadGameModes();
    this.loadGenres();
    this.loadPlayerPerspectives();
    this.loadThemes()
  }
  loadGameModes = (): void => {
    this.getGameModes().subscribe((data  => this.gameModes = data));
    let gameModeNames: string[] = this.gameModes.map(x => x.name);
    // console.log(gameModeNames)
  }

  getGameModes = (): Observable<GameMode[]> => {
    return this.httpClient.get<GameMode[]>(`${this.baseURL}/GameMode/GetGameModes`)}

  loadGenres = (): void => {
    this.getGenres().subscribe((data  => this.genres = data));
    let genreNames: string[] = this.genres.map(x => x.name);
    // console.log(genreNames)
  }

  getGenres = (): Observable<Genre[]> => {
    return this.httpClient.get<Genre[]>(`${this.baseURL}/Genre/GetGenres`)}

  loadPlayerPerspectives = (): void => {
    this.getPlayerPerspectives().subscribe((data  => this.playerPerspectives = data));
    let playerPerspectiveNames: string[] = this.playerPerspectives.map(x => x.name);
    // console.log(playerPerspectiveNames)
  }

  getPlayerPerspectives = (): Observable<PlayerPerspective[]> => {
    return this.httpClient.get<PlayerPerspective[]>(`${this.baseURL}/PlayerPerspective/GetPlayerPerspectives`)}

  loadThemes = (): void => {
    this.getThemes().subscribe((data  => this.themes = data));
    if (this.themes.length === 22) {
      this.themes.splice(22, 1)
    }
    let themeNames: string[] = this.themes.map(x => x.name);
    // console.log(themeNames)
  }

  getThemes = (): Observable<PlayerPerspective[]> => {
    return this.httpClient.get<PlayerPerspective[]>(`${this.baseURL}/Theme/GetThemes`)}
  }

