FROM golang:1.19.3-alpine as builder

WORKDIR /app

COPY go.mod ./
COPY main.go ./

RUN go build -o build/go-app

FROM scratch

WORKDIR /

COPY --from=builder /app/build .

ENTRYPOINT [ "./go-app" ]