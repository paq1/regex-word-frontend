import {CoRKeyPressed} from '../../services/keypressed.behaviors';
import {WordSdd} from '../../models/word.model';

export function onKeypressed(state: WordSdd, behavior: CoRKeyPressed, key: string): WordSdd {

  behavior.resolve(state, key)

  return state
}
