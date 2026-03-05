from pydantic_settings import BaseSettings, SettingsConfigDict

class Constantes(BaseSettings):

    db_name: str
    db_user: str
    db_pass: str
    db_host: str
    db_port: str

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8"
    )


config = Constantes()