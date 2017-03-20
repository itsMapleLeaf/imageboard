// @flow
import {h} from 'hyperapp'
import './styles.styl'

function onlyOnSelf (action: (...args: any[]) => any) {
  return (e: Event) => {
    if (e.target === e.currentTarget) action()
    return e
  }
}

type ImageOverlay = {
  open: boolean,
  image: string,
}

type Model = {
  images: string[],
  imageOverlay: ImageOverlay,
}

type Actions = {
  handleImageClicked(image: string): void,
  handleOverlayClosed(): void
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
  handleImageClicked (model: Model, image: string) {
    return {
      imageOverlay: {
        open: true,
        image
      }
    }
  },

  handleOverlayClosed (model: Model) {
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
      {renderImageList(model.images, actions)}
      {renderImageOverlay(model.imageOverlay, actions)}
    </main>
  )
}

function renderImageList (images: string[], actions: Actions) {
  const imageElements = images.map(image =>
    <div class='image-thumb'
      style={{ backgroundImage: `url(${image})` }}
      onclick={e => actions.handleImageClicked(image)} />
  )

  return (
    <div class='image-list'>
      {imageElements}
    </div>
  )
}

function renderImageOverlay (overlay: ImageOverlay, actions: Actions) {
  const overlayClass = 'overlay-shade ' + (overlay.open ? 'overlay-shade--visible' : '')
  return (
    <div class={overlayClass} onclick={onlyOnSelf(actions.handleOverlayClosed)}>
      <div class='overlay-content'>
        <img src={overlay.image} />
      </div>
    </div>
  )
}
