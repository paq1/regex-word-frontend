import {CoRKeyPressed} from '../../services/keypressed.behaviors';
import {TableSdd} from '../../models/word.model';

export function onKeypressed(state: TableSdd, behavior: CoRKeyPressed, key: string): TableSdd {

  behavior.resolve(state, key)

  return state
}
