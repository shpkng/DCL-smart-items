export enum Ease {
    LINEAR = 'linear',

    EASEINSINE = 'easeinsine',
    EASEOUTSINE = 'easeoutsine',
    EASEINOUTSINE = 'easeinoutsine',

    EASEINQUADRATIC = 'easeinquadratic',
    EASEOUTQUADRATIC = 'easeoutquadratic',
    EASEINOUTQUADRATIC = 'easeinoutquadratic',

    EASEINCUBIC = 'easeincubic',
    EASEOUTCUBIC = 'easeoutcubic',
    EASEINOUTCUBIC = 'easeinoutcubic',

    EASEINEXPO = 'easeinexpo',
    EASEOUTEXPO = 'easeoutexpo',
    EASEINOUTEXPO = 'easeinoutexpo',

    EASEINELASTIC = 'easeinelastic',
    EASEOUTELASTIC = 'easeoutelastic',
    EASEINOUTELASTIC = 'easeinoutelastic',

    EASEINBOUNCE = 'easeinbounce',
    EASEOUTEBOUNCE = 'easeoutbounce',
    EASEINOUTBOUNCE = 'easeinoutbounce',
}

export function easingConverter(x: number, curveType: Ease) {
    switch (curveType) {
        case Ease.LINEAR:
            return x
            break
        case Ease.EASEINSINE:
            return 1 - Math.cos((x * Math.PI) / 2)
            break
        case Ease.EASEOUTSINE:
            return Math.sin((x * Math.PI) / 2)
            break
        case Ease.EASEINOUTSINE:
            return -(Math.cos(Math.PI * x) - 1) / 2
            break
        case Ease.EASEINQUADRATIC:
            return x * x
            break
        case Ease.EASEOUTQUADRATIC:
            return 1 - (1 - x) * (1 - x)
            break
        case Ease.EASEINOUTQUADRATIC:
            return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2
            break

        case Ease.EASEINCUBIC:
            return x * x * x
            break
        case Ease.EASEOUTCUBIC:
            return 1 - Math.pow(1 - x, 3)
            break
        case Ease.EASEINOUTCUBIC:
            return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
            break
        case Ease.EASEINEXPO:
            return x === 0 ? 0 : Math.pow(2, 10 * x - 10)
            break
        case Ease.EASEOUTEXPO:
            return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
            break
        case Ease.EASEINOUTEXPO:
            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : x < 0.5
                        ? Math.pow(2, 20 * x - 10) / 2
                        : (2 - Math.pow(2, -20 * x + 10)) / 2
            break

        case Ease.EASEINELASTIC:
            const c4 = (2 * Math.PI) / 3

            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4)
            break
        case Ease.EASEOUTELASTIC:
            const c5 = (2 * Math.PI) / 3

            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c5) + 1
            break

        case Ease.EASEINOUTELASTIC:
            const c6 = (2 * Math.PI) / 4.5

            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : x < 0.5
                        ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c6)) / 2
                        : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c6)) / 2 + 1
            break

        case Ease.EASEINBOUNCE:
            return 1 - bounce(1 - x)
            break
        case Ease.EASEOUTEBOUNCE:
            return bounce(x)
            break
        case Ease.EASEINOUTBOUNCE:
            return x < 0.5 ? (1 - bounce(1 - 2 * x)) / 2 : (1 + bounce(2 * x - 1)) / 2
            break
    }
}

function bounce(x: number) {
    const n1 = 7.5625
    const d1 = 2.75

    if (x < 1 / d1) {
        return n1 * x * x
    } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75
    } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375
    } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375
    }
}