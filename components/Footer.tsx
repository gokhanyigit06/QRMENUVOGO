'use client';

import { useMenu } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Facebook, Instagram, Twitter, Phone } from 'lucide-react';
import React from 'react';
// import Image from 'next/image'; // Not using next/image to avoid path issues with base64/static assets

export default function Footer() {
    const { settings } = useMenu();

    const hasSocials = settings.socialInstagram || settings.socialFacebook || settings.socialTwitter || settings.socialWhatsapp;

    // Base64 encoded logo to ensure it renders in production without path issues
    const LOGO_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAIABJREFUeJzt3Xm4X1V97/H3SUIGQGRKAglDAgSZQUQGCVAEARkErHHAAq0oTtdS721LtfaW2lqpvVWp1vFptah1wLYqKpWZhCHMgUDCGKDMEIQAGQg5h/6xzrmZzi/nN+y9v3t4v57n83jMISffvfY+a+3fHtYCSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZJGNjq6AEmqqM2BccAr0YVI3RgVXYAkVdR0YMfoIqRueQIgSd2ZNhipksZEFyBJFTUdGIguQuqWJwCS1J29gFXRRUjd8gRAkrrjCYAkSQ0zCngZeBHoC65FkiQVZAbw2mCmB9cidcW3ACSpcwe3+FqqDE8AJKlzB7X4WpIk1dgtrL4FMDe4FkmSVIAJpOl/h04AXgHGh1YkdcFbAJLUmTcBY9f4/2OB/YNqkbrmCYAkdeboYf7sqMKrkCRJhbqe1Zf/hzI7tCJJkpSrzYCVrH8C8Org96TK8BaAJLXvKGCjYf58DHB4wbVIPfEEQJLa97YuvydJkirsAda//D+UhYF1SZKknOxL68F/KHuEVSd1yFsAktSeWW38N+/KvQpJklSohYx8BWB+WHWSJClz+zDy4O9tAFWKtwAkaWTtXP4f4m0ASZJqYgHtXwHwNoAkSTWwN+0P/kPZPaRSqQPeApCkDTuri7/zgcyrkCRJhZkAPEfnVwAWA+MD6pUkSRk4k84H/6GcFlCvJEnKwHBL/7abawLqlSRJPerk3f9W2avwqqU2+RCgJA3vIxn8jA9l8DMkSVJBNgWW0PsVgOeBjQuuXWqLVwAkaX2/B2yWwc/ZHB8GlCSpEkYD99H7p/+h3IMftiRJKr33kN3gP5R3FroFkiSpY7eQ/QnATYVugSRJ6shxZD/4D+XoArdDkiR1YC75nQDcBPQVtymSJKkd7yC/wX8oJxS2NZIkaUR9wO3kfwJwK14FkCSpNPJ48r9VZhW0TZIkaQPGAw9R3AnAIlwqWJKkcJ+muMF/KH9ayJZJkqRhTSabOf87zYvANgVsnyRJGsa/UPzgP5RvFbB9kiRpHTOBAeJOAPqBt+S+lZIk6f8bC9xN3OA/lPnARjlvqyRJGvQZ4gf/oZyb87ZKkiRgBrCM+IF/KEuBnXLdYkmSGm4UMJv4QX/dXAuMznG7JUlqtIh3/tvNn+S43ZIkNdZ+wCvED/StsgLYJ7etlySpgcYDdxI/yI+U20hvKEiSpAx8nfjBvd1ckFMbSJLUKEWu9JdV3p9LS0iS1BAziJnrv9e8BOyWQ3tIklR7G5Nm2osezLvNHcCEzFtFkqQa6wN+SPwg3msuGtwWSZLUhs8RP3hnlfOybRpJkurpPcSu8pd1BvChQEmSNmgmaUKd6EE76ywHDsmwnSRJqo29gMXED9Z55Vlgj8xaS5KkGtgJeJz4QTrvPAZMz6jNJKmxXgdsGl2EejYJuJf4wbmoPABsm0nLSVJD7QrsEl2EerIl1X7Xv9vMAzbPoP3UYKOiC5AC7QBsH12EurYl8F+ke/9Nsy9wJbB1dCGqLk8A1GTTBqPqmQxcDbw5uI5IbwRmA1OiC1E1eQKgJpuGJwBVtD0wB9g7upAS2J10JWC76EJUPZ4AqMmm4QlA1exM+tQ7I7qQEnkDcA2+HSBJbbuO9ElS1XAg8BTxD+CVNc8Ch3bdupLUIM+ROk2V36nAUuIH2bJnOfDeLttYkhphG1Z3mhODa9GGnQP0Ez+4ViUDuICQJLX0VlZ3mIcH16LhjQW+QfyAWtV8fbANJUlr+F+s7ig/ElyL1rcdcD3xg2jVczM+HKgWfAtATbV7i68V763ALbj6XRYOIJ0EHBddiCSVxVWs/pR0aXAtSvqAc/F+fx4ZAM4HRre9NySppp5mdef4WHAtSpepryF+oKx7rsS5LyQ12JpvAAzFOdVj9AFnAy8SPzg2JUtJb1b0tbF/JKlWTmL9TtF7pMXbFriY+AGxqfkNLobVaD4EqCYabgGZJi8qU7Q+4CxgIXBicC1NdgxwJ/AHeDVAUkNcwvqfhn4RWlFzvJE0BXP0p1+zdm4GDtrAfpOkWniG9TvAJ0Mrqr8tgAuAVcQPdmb49AMX4syYkmpqGq07QJdUzd4Y4KOkdReiBzjTXhYDH8ZXBiXVzCxad3ynBtZVN6NIbX0v8QOa6S6LSG9oeCIgqRa+QOsO728D66qTo4HbiB/ATDa5i3Qy54OCkirtKlp3dJcF1lV1fcDxpCl8owcsk09uBt6OJwKSKqgPeIHWHdwL2Ll1ahxwBul1sugByhSTe0kTCU1Akipib0bu3PYIq65aJpHm7X+c+AHJxORp0voCU5Gkkvs4I3dqLg28YYcA3wFWED8AmXJkBfDPwMFIUkn9mJE7sx+EVVdeU0mXfO8gfrAx5c49wHmkxZ0kqTTauVztyoDJeNKT3xcDrxI/sJhqpR+4lvQa4aZIUqBdab/z2imoxmhbkQb9C4ElxA8iph5ZRjqRPJu0EqckFeqDtN9h/X5MiSF2Il3evwxYSfxgYeqdftKroufhA7eSCvIj2u+kvhdUYxGmAqcB38BZ+kx87iUdi6cBU1ChfOdZTTAKeIr2Fzl5mrRW/Wu5VVScKcChpNn5ZgK74++9yutJ0rMDl5NWjbw7tpx6GxVdgFSA/ehshbPJwF451RJlBbA8ughpBMtJx+rQ18rRmOgCpAK8rcu/Mz/rQgI8AVw0GEhXNo4ADgeOBHYLqksCWEiannv2YFyWW1KmLqfze5OXhFRavOmkp7MvxocATf5ZRbrEfy6efIbzXqDqbgLwW9J77Z1YBmwJvJJ5ReW1JXAUcBLwDuD1seWoJpYBV5JOMn9OesZGknJ3It1/Wjk2oN6ycCIg00v6Sa+WngFsgiQF+Abdd2JfCai3jKaQ5gq4nfiBxZQ7C0jv+O+IJAXqAx6l+87skeJLLr03A98mPaEdPdiYcmQZ8C3gACSpJPan985t78KrroaJpAe5HiN+ADIxeZr0aX9rJKlk/pLeO7lPFV51tYwlPStwI/EDkikm80hvjkxAkkrqFnrv7K4vvOrqOhZPBOqcG4BjkKSSmwoM0Hun10+aGVDtO5psTr5MOTKfdJXH18YlVcIfkl0H+JGCa6+DPtJ8AvOIH8BMd7mb9BqfU8ZLqpTZZNcRXlFw7XUyGvgQ8CzxA5ppL08DH8CBX1IFbUOacjSrDnEVMKnQLaifzYELyHa/mGzTD1yIT/VLqrCPk33neHahW1Bf+wJziB/szNqZDeyzgf0mSZVwFdl3kJcVugX11gecSVqjIXrga3qeA07HB/wk1cBk8rnM7G2A7G1DWhwmehBsai4hvS0jSbXwMfLrMD9c4HY0ySy8GlBkluAtLUk1dAP5dZxzCtyOptmR9LZF9OBY91wGbN/mPpGkytiFbCb/aZUBYOfCtqZ5+kjrC/imQD7H7vn4ap+kmvos+Xek/7ewrWmuI4GniB8065JnSdM0S1It9QEPkn9nej8+MV2E7YDriB88q56bgWmdNb0kVcvhFNepHlLQNjXdWOBrxA+iVc0/ARt13OqSVDHfpriO9WsFbZOSc0iz1EUPqFXJKtKzFJJUexOA5ymug30OGF/IlmnIKcBS4gfXsudl4OQu21iSKudMiu9oTytky7SmfYFHiR9ky5ongAO6bl1JqqDrKb6zvaaQLdO6plHMw55Vy/2kuRQkqTH2Jq7T3bOA7dP6tgHuIn7QLUsW4pS+khroq8R1vF8qYPs0vEnAHcQPvtG5HZjYY1tKUuVMIHYO+eeBjXPfSrWyBTCX+EE4KrcAW/XcipJUQR8gvhM+Pfet1IZsDswj/jgoOrcBr8+g/SSpksrw6e+63LdSI5lIug8efSwUlftIy15LUiMdQHxHPJQ357ytGtn2wMPEHwt551F82l9Sw/2Q+M54KN/LeVvVnhnUexGhZ4DdMmstSaqgqcBK4jvkoawkLV6jeAcDy4k/JrLOMuDADNtJkirpC8R3yOvmb3PdYnViFjBA/DGRVQZw5klJYhPSXPzRnfK6+e1gbSqHzxJ/TGSVv8i4bSSpkj5BfIfcKh/NcbvVmT7gB8QfE73mJ4PbIkmNNoo053l0p9wq9w3WqHKYQLVnC7x9cBskqfFOIb5THikn5bb16sYMYAnxx0WneRF4Qw7tIUmVdBPxHfNImZvb1qtb7yb+uOgkA8Dv5tISklRBxxHfMbebt+XUBupe5KJRneaLObWBJFXSHOI75nbj9MDlM45qrBlwC7BRTm0gSZVzJPEdc6c5IpeWUC/2pNyTBK0A9spt6yWpgq4kvnPuNJfn0hLq1bnEHxut8skct1uSKudg4jvmbjMzh/ZQb0YBVxN/bKybOfgKqSSt5RLiO+du8+sc2kO925k0t3708TGUl4FpeW6wJFXNgcR3zr3GBVzK6VPEHxtD+eOct1WSKucK4jvnXnNN5q2iLIyhHG8F3IlP/UvSWo4nvnPOKsdl3DbKxkFAP3HHRT9wSO5bKUkVMgq4jfiBO6vcgQ94ldW3iTsuvl7A9klSpZxO/KCddd6faQspK5OAFyj+eFgCTC5g+ySpMsYCDxI/YGedh0iz0al8IuYG8ME/SVrHJ4kfrPPKJzJsJ2VnLMUuM/0gngxK0lpeBzxN/ECdV54BNsustZSlIlcMnFXQNklSZXye+EE67/xNZq2lLPVRzIOntw7+W5KkQbuQFkOJHqDzzgpg14zaTNk6ifz3//GFbY0kVcSviB+ci8ovMmozZe8G8tvvLhMtSeso4pNX2XJCJi2nrB1Dfvv8rQVuhySV3jjgXuIH5KLzAD4JXlZzyX5/31joFkhSBXyG+ME4Kp/KoP2UvVlkv69PKXQLJKnkticthRo9EEdlKbBjz62orI0C7iO7/XwPTgUtSWu5iPhBODo/6rkVlYcPk90+Pqvg2iWp1I4jfvAtS47psS2VvY2B5+l93z4/+LMkScAmwCLiB96y5GHSLIgql6/S+779UuFVS1KJfY34Qbds+UpPLao87E3v+3XPwquWpJI6AhggfsAtW/qBw3poV+XjOrrfp1cXX64kldMEsn26um65d7CNVB5n0P3+fF9AvZJUSv+P+EG27Dm/69ZVHiYAz9H5fnwWGB9QrySVzoHAKuIH2LLnVeCALttY+fgSne/HL4RUKkklMxaYT/zgWpXcAWzUVUsrD3vR+T7cLaRSSSqZzxM/qFYtf9NVSysvd9PZCZwkNd4ReOm/m/Tj6nFl8le0v+8+E1SjJJXGFsAjxA+mVc2jwFYdt7ry0MltAC//S2q8nxE/iFY9/9FxqysvCxh5f3n5X5XhClXKy8eAk6OLqIFTgbOjixCQFq/K4r+RpNrag7TUbfSn57pkOWlaWsVq5zbA7mHVSVKwccA84gfNumU+TixTBvfTeh8tCKxL6pi3AJS1vwf2jS6ihvYivU6pWJd2+T1JqrVTcaGfPDMAvLvtvaE8nELr/XNCYF2SFGZ3YAnxg2Td8xLpaoBibAasZP39snLwe5LUKFuw4XujJtsswvkBIg23RPA1oRVJXfAZAPVqFPB9YJfoQhpkOvBDYHR0IQ11WZt/Jkm15jz/cfnrNvaPsjeT9ffFW0IrkqSCnYIP/UVmAJg14l5S1sYDr7B6P6wgvf4qSY2wGz70V4a8BOw5wr5S9m5i9T64PrgWqSs+A6BubAFcjE89l8GmpPUCNo8upGFuXOPruWFVSD3wBECdGkua79yH/spjV+DneBm6SDe2+FqSaqkP+B7xl73N8PkRntQXZQar2316cC2SlLsvEj/ImQ3nCy33nrI0ivT8xRLSibEk1dbHiB/cTHs5p8U+VLZuJE0KJFXSmOgCVAmzgK9EF6G2fRF4HPhpdCE1dxfQH12E1C1PADSSw4AL8d5ylYwiPavxFHBtcC11djdpLgapkuzUtSF7AD/DdeiraDzpzYDdogupsUWDkSrJEwC1sgPwa2DL6ELUtS2BS4DtowupqYcHI0m1sR3wAPEPs5lscj8wFWVtc5yASVKNTAYWEj9omWxzHzAFSZKGMZn0YFP0YGXyyb3AtkiStIZJpNeaogcpk2/uwZMASdKgicB84gcnU0wWAtsgSWq0icCdxA9KptjcAWyNJKmRtgLmET8YmZjchq95SlLjbEP6FBg9CJnY3I2vCEpSY0wjvRsePfiYcuQhYBckSbW2B/AY8YOOKVeeBPZBklRLbwGeI36wMeXMYuBgJEm1cgqwjPhBxpQ7y4F3I0mqhU8Aq4gfXEw1sgr4OJKkyuoDziN+QDHVzAW4YqgkVc7GwEXEDyKm2vkJ6ViSJFXAFOBm4gcPU4/MA3ZAklRqBwNPED9omHrlCeBAJEmldDrpKe7owcLUM8uA9yNJKo0xwPnEDxCmGfkmMBZJUqgpwHXEDwqmWbmWdOxJkgIcATxF/GBgmpkngcOQVEmjowtQV/qAc4DvAZsF16Lm2pT03MloYDbppECSlJNJwH8R/+nPmDVzJd4SkKTcHIWv+Jny5hng7UiSMjMe+AdggPhO3pgNpR/4AjAOSVJP9gJuJ75jN6aT3AXsj6TS8iHA8hoF/CHwU2BqcC1SpyYBHyD1MXNIJwWSpBG8Ad/tN/XJtcAMJJWKVwDKZQzwCdIKbDsF1yJlZQfgQ8BGwPWk5wQkSYP2xRX8TP1zB3AAksJ5BSDeJsDngO8A2wXXIuVtMunZgI2BG4BXY8uRpBgnAQ8R/6nMmIg8CpyBJDXIzsCviO+AjSlDLgamI6lQ3gIo1sbAnwP/BuweXItUFrsCZ5Nefb0ZWBVbjiRlpw+YhZf7jRkpj7L6ZECSKu0gfKffmE5zMy41LKmiZpBm8YvuSI2pagaAHwO7IEkVsB3wTdLrTdEdqDF1yErgQnxQUFJJbQWcDywjvsM0po55hXRyPRlJPeuLLqAGtgbOGczrgmuRmuAl4MvABcBzwbVIleUJQPcmAR8D/gh4fXAtUhMtBf4Z+DvgieBapMrxBKBzOwD/h7S4yYTgWiSlZwS+C/wN6TVCSW3wBKB9+wH/G3gPMDa4FknrWwn8EPgSadEhSRvgCcCG9QFHke7vn4DtJVXFdaRbA78kPUAoaR0OaMPbBHg/6f6+U/ZK1bWA9MDgD0hv6Ega5AnA2nYlLVX6IWDL4FokZedF4EfAV4H5wbVIpeAJQLqffzJp/vGjsE2kursV+BZpcqEVwbVIYZo82O0D/D7pUv+k2FIkBXiadGvgu3hVQA3UtBOALUir8p0BHBpci6TyWEC6IvAd4JngWqRCNOEEYGPgROB9wPH4Cp+k1lYCvyK9TvgrfHBQNVbXE4BxwDGkT/un4BS9kjq3HLgCuAj4d9LMg1Jt1OkEYBPSoP9O4B3AZrHlSKqRF4GfA/8BXIpXBlQDVT8B2Jp0Wf9E4O3AprHlSGqAFcC1pEmGfgo8HluO1J2qnQCMAt5E+qR/EvDmwT+TpAgDwE3AxaQrA7cN/plUelU4AZgMHA4cTRr0t40tR5Jaeg64Ergc+A3wSGw5UmtlPAHYBjiMNOgfhVPxSqquBaQHCecAs0lzD0ilUIYTgCmkd/JnDv7v/pSjLknK2iLSQkXXkq4SLIotR03m/XNJkhqojJ+0J5FuARxGugWwV2w5ktS1+aRnAmaTPvU7y6BKo4wnAOuaBBxBegjwBGBqbDmS1NJi4CrS5f1LgEdjy5Faq8IJwJpGAfux+jXAg/E2hqQ4/cBcVr8GOA94LbQiqU1VOwFY11akqwInAsfhlL+S8jc0RfDFg3kythypO1U/AVjTBNIzA+8ETgU2jy1HUo08D/wnaSrgK0izAUqVVqcTgDWNBo4kLft7Mq4LIKlzy0gP8F1IWgdgZWw5UrbqegKwpgmkdQLeR3puYFxsOZJK7BXgF6TlgC/BT/qqsSacAKxpc+DdpCsDhwbXIqk8bgW+B/yA9CS/Un/5GrAkuhDlo2knAGvaAzgTOB3XF5Ca6AnSoP+vwMLgWsrojaS3HO6MLkT5aPIJwJBRwFuBc0hvFNgmUn29RnqI71vAz4BXY8sptVNJJwC/iC5E+RgTXUAJDJAm7bgc2AX4IHAWsHVkUZIytQT4MfCPwN3BtVTFdFzauNb8tDu8CaSHBv8I2Du4FknduxP4EvAjfKCvU/8CrALOji5EijKTNNnHAOnyoTGm/LmW9NaPH3K6dxNwfXQRyo+/HO3bE/gk8Hv4KqFURitID/V9GVgQXEvVjQJeJH3weT3ppEpqvEnA+cBS4j/lGGPgZeACXCgsSzNY3b7Tg2uRSmdr4DzSFKHRHaAxTcxLpIHf13izdzqr2/l9wbUoJ66k173FpBOAnYG/Il0uk5S/JaTfvR1Ir++6GE/2DmrxtaRhbEm6NbCM+E9GxtQxS0mf+CehvN3C6nafG1yLVBkTSScCK4jvMI2pQ1YC3wSmoCJMIK2JMNT+rwDjQyuSKmYn0oIivj5oTHcZAL4PTENFmsn6++ItoRUpFz4DkJ9FpIdnDiK9kyypfTcBh5Feu304tpTGOXqYPzuq8CqkGjmJdFIQ/anKmDLnv0mrdTpHSZzrWX+/zA6tSKqB8cBn8EFBY9bNUuBTOMlWtM1Iz1ysu39eHfyepB5tB1xIfKdrTBlyMd7nL4tTab2fTgysSznwGYAYj5Euc74DeCi4FinKg6RB5SS8z18Wb+vye5K6MAH4HMNfdjOmjlkJfBZfLSujB2i93xYG1iXV2t6kJ5+jO2dj8sztwP6ojPZl5P23R1h1ypy3AMpjPuld2z8iPRAl1cly4M+AA4DbgmvR8Ga18d+8K/cqpIabAcwh/tOaMVnkGtKaGSq3hYy8L+eHVSc1SB9poROnFDZVzUrSoj2jUdntQ/v71dsANeEtgPJ6jbTwyZtI902lKrkLOJB0AtAfW4ra0M7l/yHeBpAKNA74O1JHGv2pzpgNpR/4PDAWVckC2t/H3gaQAhwJPE58J2/McHkaOBZVzd50vq93D6lUmfIWQLVcBewHXBJdiLSOK0jH5m+iC1HHzuri73wg8yoktWXoAcE11+w2JiKvku7z+2GimiYAz9H5fl+MEzlJoQ4DniB+EDDNzOPAoajKzqT7/X9aQL2S1jCRdPk1ejAwzcocYFtUdcMt/dturgmoV9I6xgDnEz8omGbkm8BGqOo6efe/VfYqvGpJwzoNWEb8AGHqmWXAe1FdfI3ej4kLCq9aUktvBP6b+MHC1CtPAG9GdbEpsITej4vngY0Lrl3SBkzBlQVNdrkd2AHVyUfI7vj4YMG1SxrBxsBPiB88TLXzY/yEVzejgfvI7hi5B18DlUqnj/SOdvQgYqqZC7Bjr6P3kP2x8s5Ct0BS284iTdgSPaCYamQV8DFUV7eQ/TFzU6FbIKkjJwNLiR9cTLnzMnASqqvjyO/YObrA7ZDUoYNJU3hGDzKmnHmWtISv6msu+R0/N5FuO0oqqd2BR4kfbEy58gRpVTjV1zvI/zg6obCtkdSVaWT7FLCpdhYBO6M66yO9zpn3sXQrXgWQSm8bYB7xg4+JzV2keSNUb3k8+d8qswraJkk92BK4jfhByMTkVmALVHfjgYco7rhahEsFS5WwBfm8FmTKnXnAVqgJPk3xx9efFrJlkno2EbiT+EHJFJM7gK1RE0wmmzn/O82LpNuMkipgIjCf+MHJ5JuF2DE3yb8Qd6x9q4Dtk5SRScDdxA9SJp/cA2yLmmImMEDc8dYPvCX3rZSUmcnAAuIHK5Nt7sWn/ZtkLOU4mZ8PbJTztkrK0DakS8XRnYfJJvfh4N80nyH+uBvKuTlvq6SMbU+xrw6ZfPIgMBU1yQxgGfHH3lCWAjvlusWSMrcL8AzxHYjpLouBN6y3V1Vno4DZxB976+ZaYHSO2y0pBwfiKoJVzDJ8AKuJIt75bzd/kuN2S8rJSaQ14qM7ENNe+oF3DrsnVWf7Aa8Qf/y1ygpgn9y2XlJuPkJ8B2Layyda7EPV13iqMZnXbaQ3FCRVzBeI70DMhvO3Lfee6uzrxB977eaCnNpAUo76gAuJ70DM8PkhLsXaREWu9JdV3p9LS0jK1UbApcR3IGbtXAWM28B+Uz3NIGau/17zErBbDu0hKWebk2aWi+5ETMpC4PUb3GOqo42p9voddwATMm8VSbl7A/AC8Z1I0/MisMcI+0r100e65RN9/PWai/C2lVRJJxO72EjTMwD87oh7SXX0OeKPv6xyXrZNI6kof018B9LUnDfy7lENvYd6nXgP4EOBUiWNAn5JfCfStFw82PZqlpmkCXWij7+ssxw4JMN2klSQzXAJ4SJzL+lBTDXLXqT1HaKPv7zyLD7PIlXSblTzdaSq5SVgzzb3iepjJ+Bx4o+/vPMYMD2jNpNUoFOo173JsmUAmNX23lBdTKJZr90+AGybSctJKtSXie9A6pp/6GA/qB62pNrv+nebeXibS6qcccDtxHcgdcudpAVf1BxbAjcRf+xF5TZg655bUVKh9gCWEt+B1CUv47SpTTOZaqzul3cWAFN6bEtJBXP54OzywQ7bXtW2PXAf8cddWXIPsF1PLSqpcD8mvvOoev6941ZXle0MPET8cVe2PIhvB0iVsgXwCPGdR1XzKOk+sJrhQOAp4o+7suZZ4NCuW1dS4Q4HVhHfeVQt/cCRXbS3qulUfG6mnSwH3ttlG0sKUKeFS4rKX3XV0qqic0gnfNHHXFUygOtgSJUxhvRKT3THUZXMAzbqqqVVJWOBbxB/vFU1Xx9sQ0kltx+wkvhOo+x5FXhTl22s6tgOuJ74463quRkfDpQq4e+I7zDKns913bqqirfiw35ZZjFwXEd7QFLhxuGqgRvKPTjbX531Aefi/f48MgCcD4xue29IKtwh2AEOl37SWu+qp+nANcQfZ3XPlcC09naJpAjDk0CbAAALcUlEQVRfIb6jKFu+3FOLqqz6gLOBF4k/xpqSpaQ3K/ra2D+SCrYJaWav6I6iLHkI2LSnFlUZbQtcTPzx1dT8hjStsqSSOYb4DqIMGQCO7rEtVS59wFnAC8QfX03P88Af4NUAqXRcKwD+redWVJm8EbiO+OPKrJ2bgYM2sN8kFWw74CXiO4eoLAV26LkVVQZbABfgtNdlTj9wITCxxT6UVLBPE98xROXcDNpPscYAHwWeI/54Mu1lMfBhfGVQCjcWuJf4TqHo3E+aF0HVNAqYRTOP3bpkEekNDU8EpEDHEt8ZFJ3jM2k5RTga17aoU+4incz5oKAU5JfEdwRF5WcZtZmK00c6abuF+OPH5JObgbfjiYBUuJ1Ja31HdwJ5ZwUwI6M2U/7GAWcAdxJ/7Jhici9pIqEJSCrM54j/5c87n82stZSnSaSHNB8n/pgxMXmatL7AVCTlblPqvUraM8DrMmst5eEQ4DukKzXRx4spR1YA/wwcjKRc/SHxv/B55eMZtpOyM5V0yfcO4o8RU+7cA5xHWtxJUsbGAg8Q/4uedRYNbpvKYTzpye+LgVeJPz5MtdIPXEt6jdB1PKQMvZ/4X/Cs895MW0jd2Io06F8ILCH+mDD1yDLSieTZwDZUiK87qIz6SK9b7R9dSEbuIG3LQHQhDbQTcBJwInAEsFFsOaq5AeB20mvNPwEWxJazYZ4AqKyOAy6JLiIjxwKXRhfREFNJA/3hwJHArrHlqOHuA64CZgNXA0+EVrMOTwBUZpcDR0UX0aNrgN+JLqLGpgCHkmbnmwnsjv2ayutJ0rMDl5NWjbw7sphRkf+4NIJPRxeQgT+NLqAhVpAmkpLKbDnpWB36OpRnyiq7X5Om56yiXwMnRBfRMNuy9i2A3WLLUcMtZPUtgNmkKwCl4QmAyu5g4IboIro0k3SZT3GmA28jPQh4LD4EqHz1A3NJbwX8nDRvgKQeXEH8qz6d5rJcWkK92JLVrwG+QPwxYuqRpax+DXAykjL1O8T/kneaw/NoCGXGiYBML+knneSfAWyCpFzNJv6Xvt1cnU8TKCdTSFMB3078sWPKnQWkqYB3RFJhjiH+l7/dVP3VxSZ7M/BtmrE0tWkvy4BvAQcgKcx1xHcGI6WqDyxqbRNJywE/RvwxZWLyNOnT/tZICvcO4juFkXJibluvCGNJzwrcSPyxZYrJPNIDfROQVBp9pPdqozuIVrkXJ9eqs2PxRKDOuYF0q1FSSX2c+I6iVT6c43arPI4mLVYVfbyZbDKfdJXHeXGkktsYWEx8p7FunsPXgZqkjzS50Dzijz3TXe4mvcbnVTupQj5PfOexbv461y1WWY0GPgQ8S/wxaNrL08AHcOCXKmkK8ArxHclQXiHNQa/m2hy4AFhF/PFohk8/aRZIn+qXKu77xHcoQ/luvpuqCtkXmEP8MWnWzmxgnw3sN0kVsj/xncpQ9st5W1UtfcCZwG+JPzabnueA0/EBP6l2biC+g5mT+1aqqrYhrQgXfYw2NZcAU0fcS5Iq6feJ72R+L++NVOXNwqsBRWYJaSIfSTU2gdiOdTFpVTlpJDtSzWWtq5bLgO3b3CeSKu4fietsvljA9qk++kjrC/imQPYZAM7HV/ukRtmd9Msf0ensUcD2qX6OBJ4iftCsS54lTdMsqYGupfhO56pCtkx1tR3VWN2y7LkZmNZZ00uqk9MpvuN5byFbpjobC3yN+EG0qvknYKOOW11SrRT9MOBiYFwhW6YmOIc0S130gFqVrCI9SyFJAHyT4jqgrxa0TWqOU4ClxA+uZc/LwMldtrGkmppJcZ3QQQVtk5plX+BR4gfZsuYJ4ICuW1dSbfUBD5B/J3Q/Tiuq/EwDHiR+sC1b7ifNpaAM+c6k6uI14AcF/DsXDv5bUh4eBg4lrVWv5B7gd4BHguuQVGK7kO+cAAPAToVtjZpsEnAH8Z+8o3M7MLHHtpTUENeTX2c0u8DtkLYA5hI/CEflFmCrnltRUmN8lPw6JBcYUdE2B+YRPxgXnduA12fQfpIaZGvgVbLvkF7FS5GKMRFYSPygXFTuAyZn0nKSGiePVdd+U+gWSGvbnvSAYPTgnHcexaf9JfUgj9sAHyx0C6T1zaDeiwg9A+yWWWtJaqTJZLvkqpf/VRYHA8uJH6yzzjLgwAzbSVKDXUV2ndOlBdcubcgs4pbAziMDwGmZtpCkRvs42XVQHyq4dmkknyV+4M4qf5Fx20hquG3JZoW1VaRJWaQy6SPNfBk9ePean+DU2pJycCO9d1BzCq9aas8Eqj1b4O2D26AgrgWgOvtlSX6GlIflwLuAF6ML6cJLwHtJ2yBJmduP3j+l7Fl41VJn3k38p/lOMgD8bi4tIUlreJjuO6pFxZcrdeWrxA/s7eaLObWBJK3la3TfUV0QUK/UjXFUY82AW4CNcmoDSVrL8XTfWb0toF6pW3tS7kmCVgB75bb1krSOCXTXKS4lfaqSquRc4gf6VvlkjtstScO6jM47q1+HVCr1ZhRwNfGD/bqZg2+dlY47RE1wWUF/R4o2AJxFuV6vWwqcTqpNkgr1Rjr/xOK9SlXZp4j/1D+UP855WyWppT7gadrvsJ7E6UlVbWMox1sBd+JT/5KC/Rvtd1r/GlSjlKWDyGY9jG7TDxyS+1ZK0gjOov2O68ygGqWsfZu4E4CvF7B9kjSiGbTfcU0PqlHK2iTgBYof/JcAkwvYPklqy+OM3HE9GladlI+IuQF88E9SqfyIkTuu74dVJ+VjLHA/xQ3+D+IkWpXgPABqktlt/Ddzcq9CKtZK4M8L/Pf+DHilwH9Pkka0FyN/etk9rDopP33AbeT/6f9WfIVWUgn1Ac/TuvP6LXZeqq+TyP8E4PjCtkaSOnQFrTuvSwPrkopwA/kN/tcVuB3KgM8AqGlu7vJ7Uh38ZY4/+y9y/NmS1LN30foTzCmBdUlFmUv2n/5vLHQLJKkLO9K6E5saWJdUlFlkfwLgybOkShhuYaAnQyuSijMKuI/sBv978HZyJbnT1ES3DPNnNxVehRRjAPiHDH/e3w/+TFWMJwBqouEe9vMBQDXJ90hrBPTqBeCHGfwcBfAEQE3kCYCabhnwgwx+zncHf5YkVcJk1r+PuVVoRVLx9qb3+/97Fl61JPXoKVZ3Yo8F1yJFuY7uB/+riy9XWfIWgJpqQYuvpSb5ZtDfVQl4AqCmWrjG154AqKkuIq2B0anFwH9mXIsK5gmAmmphi6+lJlkOXNjF3/sOsCLjWiSpEG9l9b3Mw4NrkSK1s0z2utktpFJJysA2rO7Mtg6uRYp2N+0P/ncE1aiMeQtATfUU8BzpXubi4FqkaD/t4L+9KLcqJKkg1wKzo4uQSqCT2wBe/q8JrwCoyR4CFkUXIZXAXbT3MOydpMV/VAOeAKjJHh6MpPYu7Xv5v0Y8AVCTPTIYSe0N7v+eexWSVICjgSOji5BK5H5a3/t3wqya8QqAmuwR4L+ji5BK5NIuvydJlbLpYCQlp9D6CsAJgXVJkqQcbQasZP3Bf+Xg9yRJUk0Nt0TwNaEVKRc+AyBJWtNlbf6ZJEmqkZmsfwXgLaEVSZKk3I0HXmH14L8CGBdakXLhLQBJ0ppWsPaKf7eRTghUM54ASJLWdeMaX88Nq0K58gRAkrSuG1t8LUmSamwGq58BmB5ciyRJKsgo4CVgCdAXXItyMia6AElS6QyQFv9ZRboKoBryBECSNJy7gP7oIpQfTwAkScO5m3QlQDXlCYAkaTiL8ASg1jwBkCQN52E8Aai10dEFSJJKaQXpLYAV0YVIkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkqQ4/wM83Nxy/Vb5pQAAAABJRU5ErkJggg==";

    return (
        <footer className="w-full bg-transparent mt-4 pb-0 md:pb-0">
            <div className="mx-auto max-w-7xl px-4 pt-4 pb-0 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">

                    {/* Logo if exists */}
                    {settings.logoUrl && (
                        <div className="flex flex-col items-center gap-6">
                            <div className="relative h-12 w-auto overflow-hidden opacity-80 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                                <img
                                    src={settings.logoUrl}
                                    alt="Logo"
                                    className="h-full w-auto object-contain"
                                />
                            </div>

                            {/* VOGOLAB Branding (Clickable) */}
                            <a
                                href="https://vogopos.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center justify-center gap-1 opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
                            >
                                <img
                                    src={LOGO_BASE64}
                                    alt="VogoPos Logo"
                                    className="h-6 w-auto object-contain dark:invert"
                                />
                                <p className="text-[10px] font-bold text-gray-800 dark:text-gray-400 tracking-widest uppercase">
                                    VOGOPOS <span className="text-gray-400 dark:text-gray-600 font-light mx-0.5">|</span> QR MENU
                                </p>
                            </a>
                        </div>
                    )}

                    {!settings.logoUrl && (
                        /* Fallback VOGOPOS Branding if no main logo exists (Clickable) */
                        <a
                            href="https://vogopos.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center gap-1 opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
                        >
                            <img
                                src={LOGO_BASE64}
                                alt="VogoPos Logo"
                                className="h-6 w-auto object-contain dark:invert"
                            />
                            <p className="text-[10px] font-bold text-gray-800 dark:text-gray-400 tracking-widest uppercase">
                                VOGOPOS <span className="text-gray-400 dark:text-gray-600 font-light mx-0.5">|</span> QR MENU
                            </p>
                        </a>
                    )}

                    {/* Social Icons */}
                    {hasSocials && (
                        <div className="flex items-center gap-6">
                            {settings.socialInstagram && (
                                <a
                                    href={settings.socialInstagram.startsWith('http') ? settings.socialInstagram : `https://instagram.com/${settings.socialInstagram.replace('@', '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group rounded-full bg-gray-50 p-3 text-gray-500 transition-all hover:bg-gradient-to-tr hover:from-amber-500 hover:to-purple-600 hover:text-white hover:shadow-lg hover:shadow-purple-500/30"
                                >
                                    <Instagram className="h-5 w-5" />
                                </a>
                            )}
                            {settings.socialFacebook && (
                                <a
                                    href={settings.socialFacebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group rounded-full bg-gray-50 p-3 text-gray-500 transition-all hover:bg-[#1877F2] hover:text-white hover:shadow-lg hover:shadow-blue-500/30"
                                >
                                    <Facebook className="h-5 w-5" />
                                </a>
                            )}
                            {settings.socialTwitter && (
                                <a
                                    href={settings.socialTwitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group rounded-full bg-gray-50 p-3 text-gray-500 transition-all hover:bg-black hover:text-white hover:shadow-lg hover:shadow-gray-500/30"
                                >
                                    <Twitter className="h-5 w-5" />
                                </a>
                            )}
                            {settings.socialWhatsapp && (
                                <a
                                    href={`https://wa.me/${settings.socialWhatsapp.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group rounded-full bg-gray-50 p-3 text-gray-500 transition-all hover:bg-[#25D366] hover:text-white hover:shadow-lg hover:shadow-green-500/30"
                                >
                                    <Phone className="h-5 w-5" />
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </footer>
    );
}
