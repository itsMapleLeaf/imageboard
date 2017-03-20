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
      <ImageList images={model.images} onimageclicked={actions.handleImageClicked} />
      <Overlay open={model.imageOverlay.open} onclose={actions.handleOverlayClosed}>
        <img src={model.imageOverlay.image} />
      </Overlay>
    </main>
  )
}

function ImageList ({ images, onimageclicked }: { images: string[], onimageclicked: (image: string) => any }) {
  const imageElements = images.map(image =>
    <div class='image-thumb'
      style={{ backgroundImage: `url(${image})` }}
      onclick={e => onimageclicked(image)} />
  )

  return (
    <div class='image-list'>
      {imageElements}
    </div>
  )
}

function Overlay ({ open, onclose }: { open: boolean, onclose: () => any }, children) {
  const overlayClass = 'overlay-shade ' + (open ? 'overlay-shade--visible' : '')
  return (
    <div class={overlayClass} onclick={onlyOnSelf(onclose)}>
      <div class='overlay-content'>
        {children}
      </div>
    </div>
  )
}
