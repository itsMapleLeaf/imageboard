// @flow
import {h} from 'hyperapp'
import './styles.styl'

type Model = {
  images: string[],
  imageOverlay: {
    open: boolean,
    image: string,
  }
}

type Actions = {
  closeOverlay(): void
}

export const model: Model = {
  images: [
    require('./test1.png'),
    require('./test2.png'),
    require('./test3.jpg'),
    require('./test4.png')
  ],
  imageOverlay: {
    open: true,
    image: require('./test1.png')
  }
}

export const actions = {
  closeOverlay () {
    return {
      imageOverlay: {
        open: false,
        image: ''
      }
    }
  }
}

export function view (model: Model, actions: Actions) {
  return (
    <main>
      <div class='image-list'>
        {model.images.map(src =>
          <div class='image-thumb' style={{ backgroundImage: `url(${src})` }} />
        )}
      </div>
      <div class={'overlay-shade ' + (model.imageOverlay.open ? 'overlay-shade--visible' : '')} onclick={actions.closeOverlay}>
        <div class='overlay-content'>
          <img src={model.imageOverlay.image} />
        </div>
      </div>
    </main>
  )
}
