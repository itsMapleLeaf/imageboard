// @flow
import {h} from 'hyperapp'
import './styles.styl'

type Model = {
  images: string[]
}

type Actions = {}

export const model: Model = {
  images: [
    require('./test1.png'),
    require('./test2.png'),
    require('./test3.jpg'),
    require('./test4.png')
  ]
}

export const actions = {}

export function view (model: Model, actions: Actions) {
  return (
    <div class='image-list'>
      {model.images.map(src =>
        <div class='image-thumb' style={{ backgroundImage: `url(${src})` }} />
      )}
    </div>
  )
}
