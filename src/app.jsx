// @flow
import {h} from 'hyperapp'
import './styles.styl'

function onlyOnSelf (action: (...args: any[]) => any) {
  return (e: Event) => {
    if (e.target === e.currentTarget) {
      action()
    }
    return e
  }
}

type Model = {
  images: string[],
  imageOverlay: {
    open: boolean,
    image: string,
  }
}

type Actions = {
  openOverlay(image: string): void,
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
    open: false,
    image: ''
  }
}

export const actions = {
  openOverlay (model: Model, image: string) {
    return {
      imageOverlay: {
        open: true,
        image
      }
    }
  },

  closeOverlay (model: Model) {
    return {
      imageOverlay: {
        open: false,
        image: model.imageOverlay.image
      }
    }
  }
}

export function view (model: Model, actions: Actions) {
  return (
    <main>
      <div class='image-list'>
        {model.images.map(image =>
          <div class='image-thumb'
            style={{ backgroundImage: `url(${image})` }}
            onclick={e => actions.openOverlay(image)} />
        )}
      </div>
      <div class={'overlay-shade ' + (model.imageOverlay.open ? 'overlay-shade--visible' : '')}
        onclick={onlyOnSelf(actions.closeOverlay)}>
        <div class='overlay-content'>
          <img src={model.imageOverlay.image} />
        </div>
      </div>
    </main>
  )
}
